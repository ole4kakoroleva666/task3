import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([]);

    const loadTasks = () => {
        const savedTasks = localStorage.getItem('kanban-tasks');
        if (savedTasks) {
            try {
                const parsed = JSON.parse(savedTasks).map(task => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                    deadline: new Date(task.deadline),
                    lastEditedAt: new Date(task.lastEditedAt)
                }));
                tasks.value = parsed;
            } catch (e) {
                console.error('Error loading tasks:', e);
                tasks.value = [];
            }
        } else {
            tasks.value = [];
        }
    };

    const saveTasks = () => {
        localStorage.setItem('kanban-tasks', JSON.stringify(tasks.value));
    };

    loadTasks();

    const createTask = (taskData) => {
        const newTask = {
            id: uuidv4(),
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            createdAt: new Date(),
            lastEditedAt: new Date(),
            status: 'planned'
        };
        tasks.value.push(newTask);
        saveTasks();
    };

    const updateTask = (taskId, updates) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.title = updates.title || task.title;
            task.description = updates.description || task.description;
            task.deadline = updates.deadline || task.deadline;
            task.lastEditedAt = new Date();
            saveTasks();
        }
    };

    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(t => t.id !== taskId);
        saveTasks();
    };

    const moveTask = (taskId, newStatus, reason = '') => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            const oldStatus = task.status;
            task.status = newStatus;
            task.lastEditedAt = new Date();

            if (newStatus === 'inProgress' && reason) {
                task.returnReason = reason;
            }

            if (newStatus === 'completed') {
                const now = new Date();
                const deadline = new Date(task.deadline);
                task.isOverdue = deadline < now;
            }

            if (oldStatus === 'completed' && newStatus !== 'completed') {
                task.isOverdue = undefined;
            }

            saveTasks();
        }
    };


    const plannedTasks = computed(() =>
        tasks.value.filter(task => task.status === 'planned')
    );

    const inProgressTasks = computed(() =>
        tasks.value.filter(task => task.status === 'inProgress')
    );

    const testingTasks = computed(() =>
        tasks.value.filter(task => task.status === 'testing')
    );

    const completedTasks = computed(() =>
        tasks.value.filter(task => task.status === 'completed')
    );


    return {
        tasks,
        plannedTasks,
        inProgressTasks,
        testingTasks,
        completedTasks,
        createTask,
        updateTask,
        deleteTask,
        moveTask
    };
});
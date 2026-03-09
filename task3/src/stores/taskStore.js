import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([{
            id: '1',
            title: 'Learn Vue 3',
            description: 'Complete the kanban board project',
            createdAt: new Date('2024-03-01T10:00:00'),
            deadline: new Date('2024-03-10T18:00:00'),
            lastEditedAt: new Date('2024-03-01T10:00:00'),
            status: 'planned'
        },
        {
            id: '2',
            title: 'Write documentation',
            description: 'Document all components and their props',
            createdAt: new Date('2024-03-02T14:30:00'),
            deadline: new Date('2024-03-05T12:00:00'),
            lastEditedAt: new Date('2024-03-03T09:15:00'),
            status: 'inProgress'
        },
        {
            id: '3',
            title: 'Design UI',
            description: 'Create mockups for the board',
            createdAt: new Date('2024-03-01T09:00:00'),
            deadline: new Date('2024-03-08T17:00:00'),
            lastEditedAt: new Date('2024-03-01T09:00:00'),
            status: 'planned'
        }
    ]);

    // СОЗДАНИЕ новой задачи
    const createTask = (taskData) => {
        const newTask = {
            id: uuidv4(),
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            createdAt: new Date(),
            lastEditedAt: new Date(),
            status: 'planned' // новые задачи всегда в первой колонке
        };
        tasks.value.push(newTask);
    };

    // ОБНОВЛЕНИЕ задачи
    const updateTask = (taskId, updates) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.title = updates.title || task.title;
            task.description = updates.description || task.description;
            task.deadline = updates.deadline || task.deadline;
            task.lastEditedAt = new Date(); // обновляем время редактирования
        }
    };

    // УДАЛЕНИЕ задачи
    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(t => t.id !== taskId);
    };

    const moveTask = (taskId, newStatus) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            task.lastEditedAt = new Date();
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
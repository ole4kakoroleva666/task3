import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

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
            title: 'Test login feature',
            description: 'Test user authentication flow',
            createdAt: new Date('2024-03-01T09:00:00'),
            deadline: new Date('2024-03-08T17:00:00'),
            lastEditedAt: new Date('2024-03-01T09:00:00'),
            status: 'testing',
            returnReason: 'Found bugs in login flow'
        },
        {
            id: '4',
            title: 'Fix navigation bug',
            description: 'Fix menu navigation on mobile',
            createdAt: new Date('2024-03-03T14:00:00'),
            deadline: new Date('2024-03-04T18:00:00'), // просрочка (вчера)
            lastEditedAt: new Date('2024-03-03T14:00:00'),
            status: 'completed',
            isOverdue: true // просрочена
        },
        {
            id: '5',
            title: 'Update dependencies',
            description: 'Update all npm packages',
            createdAt: new Date('2024-03-02T09:00:00'),
            deadline: new Date('2024-03-09T18:00:00'), // еще не просрочено
            lastEditedAt: new Date('2024-03-02T09:00:00'),
            status: 'completed',
            isOverdue: false // выполнена в срок
        }
    ]);

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
    };

    const updateTask = (taskId, updates) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.title = updates.title || task.title;
            task.description = updates.description || task.description;
            task.deadline = updates.deadline || task.deadline;
            task.lastEditedAt = new Date();
        }
    };

    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(t => t.id !== taskId);
    };

    // ОБНОВЛЕННАЯ функция moveTask - проверяет дедлайн при перемещении в completed
    const moveTask = (taskId, newStatus, reason = '') => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            const oldStatus = task.status;
            task.status = newStatus;
            task.lastEditedAt = new Date();

            // Если возвращаем из testing в inProgress, сохраняем причину
            if (newStatus === 'inProgress' && reason) {
                task.returnReason = reason;
            }

            // ЕСЛИ ПЕРЕМЕЩАЕМ В COMPLETED - ПРОВЕРЯЕМ ДЕДЛАЙН
            if (newStatus === 'completed') {
                const now = new Date();
                const deadline = new Date(task.deadline);
                task.isOverdue = deadline < now;
            }

            // Если перемещаем из completed обратно, можно сбросить флаг (опционально)
            if (oldStatus === 'completed' && newStatus !== 'completed') {
                task.isOverdue = undefined;
            }
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
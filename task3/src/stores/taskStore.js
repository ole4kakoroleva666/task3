import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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
        },
        {
            id: '4',
            title: 'Fix bugs',
            description: 'Fix issues in task movement',
            createdAt: new Date('2024-03-03T11:20:00'),
            deadline: new Date('2024-03-04T15:00:00'),
            lastEditedAt: new Date('2024-03-03T16:45:00'),
            status: 'inProgress'
        }
    ]);

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
        completedTasks
    };
});
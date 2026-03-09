import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([{
            id: '1',
            title: 'Learn Vue 3',
            description: 'Complete the kanban board project',
            createdAt: new Date(),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            lastEditedAt: new Date(),
            status: 'planned'
        },
        {
            id: '2',
            title: 'Write documentation',
            description: 'Document all components',
            createdAt: new Date(),
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            lastEditedAt: new Date(),
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
<template>
  <div class="app">
    <h1>My Kanban Board</h1>
    <div class="board">
      <div class="column">
        <h2>Planned ({{ store.plannedTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.plannedTasks" 
          :key="task.id" 
          :task="task"
          @edit="handleEdit(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
      </div>
      
      <div class="column">
        <h2>In Progress ({{ store.inProgressTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.inProgressTasks" 
          :key="task.id" 
          :task="task"
          @edit="handleEdit(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
      </div>
      
      <div class="column">
        <h2>Testing ({{ store.testingTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.testingTasks" 
          :key="task.id" 
          :task="task"
          @edit="handleEdit(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
        <div v-if="store.testingTasks.length === 0" class="empty-message">
          No tasks in testing
        </div>
      </div>
      
      <div class="column">
        <h2>Completed ({{ store.completedTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.completedTasks" 
          :key="task.id" 
          :task="task"
          @edit="handleEdit(task)"
          @delete="handleDelete(task.id)"
        />
        <div v-if="store.completedTasks.length === 0" class="empty-message">
          No completed tasks
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
import TaskCard from '@/components/board/taskCard.vue';

const store = useTaskStore();

const handleEdit = (task) => {
  console.log('Edit task:', task);
};

const handleDelete = (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    console.log('Delete task:', taskId);
  }
};

const handleMove = (taskId, newStatus) => {
  store.moveTask(taskId, newStatus);
};
</script>

<style>
.app {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
}

.app h1 {
  color: aqua;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.board {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.column {
  flex: 1;
  background-color: #f4f5f7;
  padding: 15px;
  border-radius: 8px;
  min-height: 600px;
}

.column h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px;
  font-style: italic;
}
</style>
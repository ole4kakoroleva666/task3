<template>
  <div class="app">
    <h1>My Kanban Board</h1>
    <div class="board">
      <div class="column">
        <h2>Planned ({{ store.plannedTasks.length }})</h2>
        <div v-for="task in store.plannedTasks" :key="task.id" class="task">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>
      </div>
      
      <div class="column">
        <h2>In Progress ({{ store.inProgressTasks.length }})</h2>
        <div v-for="task in store.inProgressTasks" :key="task.id" class="task">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>
      </div>
      
      <div class="column">
        <h2>Testing ({{ store.testingTasks.length }})</h2>
      </div>
      
      <div class="column">
        <h2>Completed ({{ store.completedTasks.length }})</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from './stores/taskStore';

const store = useTaskStore();
</script>

<style>
.app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.board {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.column {
  flex: 1;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  min-height: 500px;
}

.column h2 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.task {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.task h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.task p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
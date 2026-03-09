<template>
  <div class="app">
    <h1>My Kanban Board</h1>
    
    <!-- Кнопка создания задачи -->
    <button @click="openCreateModal" class="create-main-btn">
      + Create New Task
    </button>

    <div class="board">
      <!-- Колонка Planned -->
      <div class="column">
        <h2>Planned ({{ store.plannedTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.plannedTasks" 
          :key="task.id" 
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
      </div>
      
      <!-- Колонка In Progress -->
      <div class="column">
        <h2>In Progress ({{ store.inProgressTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.inProgressTasks" 
          :key="task.id" 
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
      </div>
      
      <!-- Колонка Testing -->
      <div class="column">
        <h2>Testing ({{ store.testingTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.testingTasks" 
          :key="task.id" 
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
        />
        <div v-if="store.testingTasks.length === 0" class="empty-message">
          No tasks in testing
        </div>
      </div>
      
      <!-- Колонка Completed -->
      <div class="column">
        <h2>Completed ({{ store.completedTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.completedTasks" 
          :key="task.id" 
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
        />
        <div v-if="store.completedTasks.length === 0" class="empty-message">
          No completed tasks
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания/редактирования -->
    <TaskForm
      v-if="showModal"
      :task-to-edit="editingTask"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskCard from '@/components/board/taskCard.vue';
import TaskForm from '@/components/taskForm.vue';

const store = useTaskStore();

// Состояние для модального окна
const showModal = ref(false);
const editingTask = ref(null);

const openCreateModal = () => {
  editingTask.value = null;
  showModal.value = true;
};

const openEditModal = (task) => {
  editingTask.value = task;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingTask.value = null;
};

const handleSave = (taskData) => {
  if (editingTask.value) {
    // Редактирование существующей задачи
    store.updateTask(editingTask.value.id, taskData);
  } else {
    // Создание новой задачи
    store.createTask(taskData);
  }
  closeModal();
};

const handleDelete = (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    store.deleteTask(taskId);
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

h1 {
  color: #333;
  margin-bottom: 20px;
}

.create-main-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.create-main-btn:hover {
  background-color: #45a049;
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
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px;
  font-style: italic;
}
</style>
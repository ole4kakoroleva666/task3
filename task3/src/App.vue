<template>
  <div class="app">
    <h1>Kanban Board</h1>
    
    <button @click="openCreateModal" class="create-main-btn">
      + Create new task
    </button>

    <div class="board">
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
      
      <div class="column">
        <h2>Testing ({{ store.testingTasks.length }})</h2>
        <TaskCard 
          v-for="task in store.testingTasks" 
          :key="task.id" 
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
          @move="(newStatus) => handleMove(task.id, newStatus)"
          @return-to-inprogress="openReturnModal(task)"
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
          @edit="openEditModal(task)"
          @delete="handleDelete(task.id)"
        />
        <div v-if="store.completedTasks.length === 0" class="empty-message">
          No completed tasks
        </div>
      </div>
    </div>

    <TaskForm
      v-if="showModal"
      :task-to-edit="editingTask"
      @close="closeModal"
      @save="handleSave"
    />

    <ReturnReasonModal
      v-if="showReturnModal"
      :task="returningTask"
      @close="closeReturnModal"
      @submit="handleReturnSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskCard from '@/components/board/taskCard.vue';
import TaskForm from '@/components/taskForm.vue';
import ReturnReasonModal from '@/components/ReturnReasonModal.vue';

const store = useTaskStore();
const showModal = ref(false);
const editingTask = ref(null);
const showReturnModal = ref(false);
const returningTask = ref(null);

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
    store.updateTask(editingTask.value.id, taskData);
  } else {
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

const openReturnModal = (task) => {
  returningTask.value = task;
  showReturnModal.value = true;
};

const closeReturnModal = () => {
  showReturnModal.value = false;
  returningTask.value = null;
};

const handleReturnSubmit = (reason) => {
  store.moveTask(returningTask.value.id, 'inProgress', reason);
  closeReturnModal();
};
</script>

<style>
.app {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.app h1{
  color: aqua;
}

h1 {
  color: #242323;
  margin-bottom: 20px;
}

.create-main-btn {
  background-color: #5e9b60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.create-main-btn:hover {
  background-color: #4f7c51;
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
  color: #242323;
  padding-bottom: 10px;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px;
}
</style>
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Return Task to In Progress</h2>
      <p class="task-info">Task: <strong>{{ task.title }}</strong></p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="reason">Please explain why you're returning this task:</label>
          <textarea
            id="reason"
            v-model="reason"
            required
            rows="4"
            placeholder="Enter reason for return..."
          />
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Return Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'submit']);

const reason = ref('');

const handleSubmit = () => {
  emit('submit', reason.value);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.task-info {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 14px;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group textarea:focus {
  outline: none;
  border-color: #f2bc85;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #e0ae7c;
  color: white;
}

.btn-primary:hover {
  background-color: #ce9677;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
}

.btn-secondary:hover {
  background-color: #da190b;
}
</style>
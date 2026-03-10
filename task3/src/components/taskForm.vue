<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ isEditing ? 'Edit Task' : 'Create New Task' }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter task title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea
            id="description"
            v-model="form.description"
            required
            placeholder="Enter task description"
            rows="4"
          />
        </div>

        <div class="form-group">
          <label for="deadline">Deadline *</label>
          <input
            id="deadline"
            v-model="form.deadline"
            type="datetime-local"
            required
          />
        </div>

        <div class="form-group">
            <label>Task items (up to 3):</label>
            <div class="item-row">
            <input type="text" v-model="form.item1" placeholder="Item 1" />
        </div>
        <div class="item-row">
            <input type="text" v-model="form.item2" placeholder="Item 2" />
        </div>
        <div class="item-row">
            <input type="text" v-model="form.item3" placeholder="Item 3" />
        </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  taskToEdit: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const isEditing = !!props.taskToEdit;

const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const form = ref({
  title: props.taskToEdit?.title || '',
  description: props.taskToEdit?.description || '',
  deadline: props.taskToEdit 
    ? formatDateForInput(props.taskToEdit.deadline)
    : formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    item1: '',
    item2: '',
    item3: ''
});

const handleSubmit = () => {
   const checklist = []
    if (form.value.item1) checklist.push({ text: form.value.item1, done: false })
    if (form.value.item2) checklist.push({ text: form.value.item2, done: false })
    if (form.value.item3) checklist.push({ text: form.value.item3, done: false })
  
  emit('save', {
    title: form.value.title,
    description: form.value.description,
    deadline: new Date(form.value.deadline),
    checklist: checklist
  });
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
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
}

.btn-secondary:hover {
  background-color: #da190b;
}
</style>
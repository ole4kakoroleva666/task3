<template>
  <div class="task-card">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <div class="task-actions">
        <button @click="$emit('edit')" class="icon-btn" title="Edit">edit</button>
        <button @click="$emit('delete')" class="icon-btn" title="Delete">delete</button>
      </div>
    </div>
    
    <p>{{ task.description }}</p>
    
    <div class="task-dates">
      <div>Created: {{ formatDate(task.createdAt) }}</div>
      <div>Deadline: {{ formatDate(task.deadline) }}</div>
      <div v-if="task.lastEditedAt !== task.createdAt" class="edited">
        Edited: {{ formatDate(task.lastEditedAt) }}
      </div>
    </div>

    <div class="task-footer">
      <button 
        v-if="task.status === 'planned'" 
        @click="$emit('move', 'inProgress')" 
        class="move-btn"
      >
        → Move to In Progress
      </button>
      
      <button 
        v-if="task.status === 'inProgress'" 
        @click="$emit('move', 'testing')" 
        class="move-btn"
      >
        → Move to Testing
      </button>
      
      <button 
        v-if="task.status === 'testing'" 
        @click="$emit('move', 'completed')" 
        class="move-btn"
      >
        → Move to Completed
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete', 'move']);

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.task-card {
  background-color: white;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 3px solid #5f4987;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
}

.task-header h3 {
  margin: 0;
  font-size: 16px;
  color: #3b3838;
}

.task-actions {
  display: flex;
  gap: 4px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  opacity: 0.6;
}

.icon-btn:hover {
  opacity: 1;
}

.task-card p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #3b3838;
  line-height: 1.4;
}

.task-dates {
  font-size: 12px;
  color: #3b3838;
  padding-top: 8px;
  margin-bottom: 12px;
}

.task-dates div {
  margin-bottom: 4px;
}

.edited {
  color: #c87658;
  font-style: italic;
}

.task-footer {
  margin-top: 8px;
}

.move-btn {
  width: 100%;
  background-color: #948ca3;
  border: none;
  border-radius: 4px;
  padding: 6px;
  color: #3b3838;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.move-btn:hover {
  background-color: #726885;
}
</style>
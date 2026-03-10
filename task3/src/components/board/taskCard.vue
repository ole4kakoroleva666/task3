<template>
  <div class="task-card" :class="{ 'task-overdue': task.isOverdue }">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <div class="task-actions">
        <button @click="$emit('edit')" title="Edit">edit</button>
        <button @click="$emit('delete')"  title="Delete">delete</button>
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

    <div v-if="task.status === 'completed'" class="status-badge" :class="{ 'overdue': task.isOverdue, 'ontime': !task.isOverdue }">
      <span v-if="task.isOverdue">Completed after deadline</span>
      <span v-else>Completed on time</span>
    </div>

    <div v-if="task.returnReason" class="return-reason">
      <strong>Return reason:</strong> {{ task.returnReason }}
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

      <button 
        v-if="task.status === 'testing'" 
        @click="$emit('return-to-inprogress')" 
        class="move-btn back"
      >
        ← Return to In Progress
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

defineEmits(['edit', 'delete', 'move', 'return-to-inprogress']);

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
  border-left: 3px solid #4f7c51;
}

.task-card.task-overdue {
  border-left-color: #c46f69;
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
  color: #242323;
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
}

.icon-btn:hover {
  opacity: 1;
}

.task-card p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #5c5959;
}

.task-dates {
  font-size: 10px;
  color: #242323;
  padding-top: 8px;
  margin-bottom: 12px;
}

.task-dates div {
  margin-bottom: 4px;
}

.edited {
  color: #242323;
  font-style: italic;
}

.status-badge {
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
}

.status-badge.overdue {
  background-color: #ffebee;
  color: #c46f69;
}

.status-badge.ontime {
  background-color: #e8f5e9;
  color: #4f7c51;
}

.return-reason {
  background-color: #faf5e6;
  color: #856404;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 12px;
}

.task-footer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.move-btn {
  width: 100%;
  background-color: #eef7fd;
  border: none;
  border-radius: 4px;
  padding: 6px;
  color: #83a6ca;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.move-btn:hover {
  background-color: #bbdefb;
}

.move-btn.back {
  background-color: #faf5e6;
  color: #856404;
}

.move-btn.back:hover {
  background-color: #f9e5c7;
}
</style>
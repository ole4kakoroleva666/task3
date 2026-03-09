<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    
    <div class="task-dates">
      <div>Created: {{ formatDate(task.createdAt) }}</div>
      <div>Deadline: {{ formatDate(task.deadline) }}</div>
      <div v-if="task.lastEditedAt !== task.createdAt" class="edited">
        Edited: {{ formatDate(task.lastEditedAt) }}
      </div>
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
  border-left: 3px solid #40366d;
}

.task-card h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #3e3434;
}

.task-card p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #3e3434;
  line-height: 1.4;
}

.task-dates {
  font-size: 12px;
  color: #3e3434;
  padding-top: 8px;
}

.task-dates div {
  margin-bottom: 4px;
}

.edited {
  color: #a47444;
  font-style: italic;
}
</style>
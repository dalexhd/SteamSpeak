export default {
  queriedTasks: (state) =>
    state.tasks.filter((task) => {
      let isItemOfCurrentFilter = false;

      if (
        (state.todoFilter === 'all' && !task.isTrashed) ||
        (state.todoFilter === 'important' && !task.isTrashed && task.isImportant) ||
        (state.todoFilter === 'starred' && !task.isTrashed && task.isStarred) ||
        (state.todoFilter === 'completed' && !task.isTrashed && task.isCompleted) ||
        (state.todoFilter === 'trashed' && task.isTrashed) ||
        task.tags.includes(state.todoFilter)
      ) {
        isItemOfCurrentFilter = true;
      }

      return (
        isItemOfCurrentFilter &&
        (task.title.toLowerCase().includes(state.todoSearchQuery.toLowerCase()) ||
          task.desc.toLowerCase().includes(state.todoSearchQuery.toLowerCase()))
      );
    }),
  getTask: (state) => (taskId) => state.tasks.find((task) => task.id === taskId)
  // getTodosBySection: state => (sectionId) => state.todoArray.filter((task) => task.sectionId == sectionId),
};

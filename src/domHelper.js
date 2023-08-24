function removeTodoItems() {
  const todoItems = document.querySelectorAll('.todo-item');
  if (todoItems != null) {
    todoItems.forEach((item) => {
      item.remove();
    });
  }
}

function loopProject(project, action) {
  project.getTodos().forEach((todo) => {
    action(todo, project);
  });
}

export { removeTodoItems, loopProject };

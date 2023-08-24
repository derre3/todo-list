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

function newElement(text, type = 'div') {
  const element = document.createElement(type);
  if (text != null) element.textContent = text;
  return element;
}

export { removeTodoItems, loopProject, newElement };

// eslint-disable-next-line import/no-cycle
import { renderNewTodoButton, renderItem } from './dom';

function removeTodoItems() {
  const todoItems = document.querySelectorAll('.todo-item');
  const button = document.querySelector('#new-todo');
  if (button != null) button.remove();
  if (todoItems != null) {
    todoItems.forEach((item) => {
      item.remove();
    });
  }
}

function loopProject(project) {
  project.getTodos().forEach((todo) => {
    renderItem(todo, project);
  });
}

function refreshItems(project) {
  removeTodoItems();
  renderNewTodoButton(project);
  loopProject(project, renderItem);
}

function newElement(text, type = 'div') {
  const element = document.createElement(type);
  if (text != null) element.textContent = text;
  return element;
}

export { newElement, refreshItems };

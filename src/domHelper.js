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

function resetPriorityButton(button) {
  Array.from(button.children).forEach((children) => {
    children.classList.remove('button-priority-null');
    children.classList.add('button-priority-null');
  });
}

function checkPriority(priority, buttonContainer, button) {
  if (priority === 0) {
    resetPriorityButton(buttonContainer);
    button[0].classList.toggle('button-priority-null');
  }
  if (priority === 1) {
    resetPriorityButton(buttonContainer);
    button[1].classList.toggle('button-priority-null');
  }
  if (priority === 2) {
    resetPriorityButton(buttonContainer);
    button[2].classList.toggle('button-priority-null');
  }
}

function isTodoDone(inputCheckMark, itemTitle, dueDate, itemContainer) {
  if (inputCheckMark.checked) {
    itemTitle.classList.add('strikethrough');
    dueDate.classList.add('strikethrough');
    itemContainer.classList.add('task-priority-null');
  }
}

function setTodoPriorityClass(priorityValue, itemContainer) {
  if (priorityValue === 0) itemContainer.classList.add('task-priority-low');
  if (priorityValue === 1) itemContainer.classList.add('task-priority-medium');
  if (priorityValue === 2) itemContainer.classList.add('task-priority-high');
}

export {
  newElement,
  refreshItems,
  resetPriorityButton,
  checkPriority,
  setTodoPriorityClass,
  isTodoDone,
};

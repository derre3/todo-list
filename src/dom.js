import './style.css';
import { projectItem, projectList } from './todo';

function renderDetailsDialog(item, project) {
  const createElement = (text, type = 'div') => {
    const element = document.createElement(type);
    if (text != null) element.textContent = text;
    return element;
  };

  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  dialog.appendChild(createElement(item.getTitle(), 'h1'));
  dialog.appendChild(createElement(item.getDescription(), 'em'));
  const title = createElement();
  const dueDate = createElement();
  const priority = createElement();

  title.appendChild(createElement('Project:', 'p'));
  title.appendChild(createElement(project.getTitle(), 'p'));

  dueDate.appendChild(createElement('Due date:', 'p'));
  dueDate.appendChild(createElement(item.getDueDate(), 'p'));

  priority.appendChild(createElement('Priority:', 'p'));
  priority.appendChild(createElement(item.getPriority(), 'p'));

  dialog.appendChild(title);
  dialog.appendChild(dueDate);
  dialog.appendChild(priority);

  // dialog.appendChild(createElement(project.getTitle(), 'p'));
  // dialog.appendChild(createElement(item.getDueDate(), 'p'));
  // dialog.appendChild(createElement(item.getPriority(), 'p'));
  return dialog;
}

function renderItem(item, project) {
  const mainContainer = document.querySelector('.main-container');
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('todo-item');
  if (item.getPriority() === 0) itemContainer.classList.add('priority-low');
  if (item.getPriority() === 1) itemContainer.classList.add('priority-medium');
  if (item.getPriority() === 2) itemContainer.classList.add('priority-high');

  const titleContainer = document.createElement('div');
  const inputCheckMark = document.createElement('input');
  const itemTitle = document.createElement('p');
  const infoContainer = document.createElement('div');
  const detailsButton = document.createElement('button');
  const dueDate = document.createElement('p');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  inputCheckMark.setAttribute('type', 'checkbox');
  inputCheckMark.checked = item.getStatus();

  itemTitle.textContent = item.getTitle();
  detailsButton.textContent = 'Details';
  dueDate.textContent = item.getDueDate();
  editButton.textContent = 'Edit';
  deleteButton.textContent = 'Delete';

  mainContainer.appendChild(itemContainer);
  itemContainer.appendChild(titleContainer);
  itemContainer.appendChild(infoContainer);

  titleContainer.appendChild(inputCheckMark);
  titleContainer.appendChild(itemTitle);

  infoContainer.appendChild(detailsButton);
  infoContainer.appendChild(dueDate);
  infoContainer.appendChild(editButton);
  infoContainer.appendChild(deleteButton);

  detailsButton.addEventListener('click', () => {
    itemContainer.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('click', (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  });

  editButton.addEventListener('click', () => {
    // WIP
    console.log('edit');
  });

  deleteButton.addEventListener('click', () => {
    itemContainer.remove();
    const index = Array.from(project.getTodos()).indexOf(item);
    project.removeTodo(index);
  });
}

function renderProject(project) {
  const projectContainer = document.querySelector('#project-container');
  const projectElement = document.createElement('div');
  projectElement.classList.add('project-item');
  projectContainer.appendChild(projectElement);
  projectElement.textContent = project.getTitle();

  projectElement.addEventListener('click', () => {
    const todoItems = document.querySelectorAll('.todo-item');
    if (todoItems != null) {
      todoItems.forEach((item) => {
        item.remove();
      });
    }
    project.getTodos().forEach((item) => {
      renderItem(item, project);
    });
  });
}

function renderAllItems(mainProject, otherProjects) {
  const mainProjectContainer = document.querySelector(
    '.main-project-container'
  );

  mainProjectContainer.addEventListener('click', () => {
    const todoItems = document.querySelectorAll('.todo-item');
    if (todoItems != null) {
      todoItems.forEach((item) => {
        item.remove();
      });
    }
    mainProject.getTodos().forEach((item) => {
      renderItem(item, mainProject);
    });
    otherProjects.forEach((project) => {
      project.getTodos().forEach((item) => {
        renderItem(item, project);
      });
    });
  });
}

// PLACEHOLDER LOCATION FOR THE CODE BELOW (TESTING PURPOSES)

// default project will always be present
// it's where to-dos not linked to any project will go
const defaultProject = projectItem('default project');
defaultProject.addTodo('one', 'description', '01/01', 0, false);
defaultProject.addTodo('two', 'description', '02/02', 1, true);
defaultProject.addTodo('three', 'description', '03/03', 2, false);

const projectContainer = projectList();
const projects = projectContainer.getProjects();
projectContainer.addProject('new project');
projectContainer.addProject('another project');
projects[0].addTodo('task 0', 'new description', 'new due date', 0, true);
projects[0].addTodo('task 1', 'new description', 'new due date', 1, true);
projects[0].addTodo('task 2', 'new description', 'new due date', 2, true);
projects[0].addTodo('task 3', 'new description', 'new due date', 2, true);
projects[1].addTodo('task 4', 'new description', 'new due date', 0, true);
projects[1].addTodo('task 5', 'new description', 'new due date', 1, true);
projects[1].addTodo('task 6', 'new description', 'new due date', 2, true);
projects[1].addTodo('task 7', 'new description', 'new due date', 2, true);

projects.forEach((project) => {
  renderProject(project);
});

renderAllItems(defaultProject, projects);

import './style.css';
import { projectItem, projectList } from './todo';

function newItem(item, project) {
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
    console.log(project.getTodos());
    console.log(item.getTitle());
    console.log(item.getDescription());
  });

  editButton.addEventListener('click', () => {
    console.log('edit');
  });

  deleteButton.addEventListener('click', () => {
    itemContainer.remove();
    const index = Array.from(project.getTodos()).indexOf(item);
    project.removeTodo(index);
  });
}

// default project will always be present
// it's where to-dos not linked to any project will go
const defaultProject = projectItem('default project');
defaultProject.addTodo('one', 'description', '01/01', 0, false);
defaultProject.addTodo('two', 'description', '02/02', 1, true);
defaultProject.addTodo('three', 'description', '03/03', 2, false);

defaultProject.getTodos().forEach((item) => {
  newItem(item, defaultProject);
});

const projectContainer = projectList();
const projects = projectContainer.getProjects();
projectContainer.addProject('new project');
projects[0].addTodo('new title', 'new description', 'new due date', 0, true);

projects[0].getTodos().forEach((item) => {
  newItem(item, projects[0]);
});

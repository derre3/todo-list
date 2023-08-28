import './style.css';
import { projectItem, projectList } from './todo';
// eslint-disable-next-line import/no-cycle
import {
  newElement,
  refreshItems,
  resetPriorityButton,
  checkPriority,
  setTodoPriorityClass,
  isTodoDone,
} from './domHelper';

function renderDetailsDialog(item, project) {
  const dialog = newElement(null, 'dialog');
  const title = newElement();
  const dueDate = newElement();
  const priority = newElement();
  let priorityValue;

  dialog.classList.add('modal-details');
  dialog.appendChild(newElement(item.getTitle(), 'h1'));
  dialog.appendChild(newElement(item.getDescription(), 'em'));

  title.appendChild(newElement('Project:', 'p'));
  title.appendChild(newElement(project.getTitle(), 'p'));

  dueDate.appendChild(newElement('Due date:', 'p'));
  dueDate.appendChild(newElement(item.getDueDate(), 'p'));

  priority.appendChild(newElement('Priority:', 'p'));
  if (item.getPriority() === 0) priorityValue = 'Low';
  if (item.getPriority() === 1) priorityValue = 'Medium';
  if (item.getPriority() === 2) priorityValue = 'High';
  priority.appendChild(newElement(priorityValue, 'p'));

  dialog.appendChild(title);
  dialog.appendChild(dueDate);
  dialog.appendChild(priority);
  return dialog;
}

function renderEditDialog(item, project) {
  // declarations
  const dialog = newElement(null, 'dialog');
  const inputContainer = newElement(null, 'div');
  const inputTitle = newElement(null, 'input');
  const inputDescription = newElement(null, 'input');
  const dateContainer = newElement(null, 'div');
  const inputDate = newElement(null, 'input');
  const priorityContainer = newElement(null, 'div');
  const buttonPriority = [
    newElement('', 'button'),
    newElement('', 'button'),
    newElement('', 'button'),
  ];
  const buttonPriorityContainer = newElement(null, 'div');
  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');
  let priorityValue = item.getPriority();

  // appends
  dialog.append(
    inputContainer,
    dateContainer,
    priorityContainer,
    buttonContainer
  );
  inputContainer.append(inputTitle, inputDescription);
  dateContainer.append(newElement('Due Date:', 'p'), inputDate);
  priorityContainer.append(
    newElement('Priority:', 'p'),
    buttonPriorityContainer
  );
  buttonPriorityContainer.append(
    buttonPriority[0],
    buttonPriority[1],
    buttonPriority[2]
  );
  buttonContainer.append(buttonCancel, buttonConfirm);

  // data
  dialog.classList.add('modal-input');
  inputTitle.setAttribute('type', 'text');
  inputDescription.setAttribute('type', 'text');
  inputDate.setAttribute('type', 'date');
  buttonPriority[0].classList.add('button-priority-low');
  buttonPriority[1].classList.add('button-priority-medium');
  buttonPriority[2].classList.add('button-priority-high');
  inputTitle.value = item.getTitle();
  inputDescription.value = item.getDescription();
  inputDate.value = item.getDueDate();
  buttonContainer.classList.add('button-container');

  // checks
  checkPriority(priorityValue, buttonPriorityContainer, buttonPriority);

  // Listeners
  buttonPriority[0].addEventListener('click', () => {
    priorityValue = 0;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[0].classList.toggle('button-priority-null');
  });
  buttonPriority[1].addEventListener('click', () => {
    priorityValue = 1;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[1].classList.toggle('button-priority-null');
  });
  buttonPriority[2].addEventListener('click', () => {
    priorityValue = 2;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[2].classList.toggle('button-priority-null');
  });
  buttonCancel.addEventListener('click', () => {
    dialog.remove();
  });
  buttonConfirm.addEventListener('click', () => {
    item.setTitle(inputTitle.value);
    item.setDescription(inputDescription.value);
    item.setDueDate(inputDate.value);
    item.setPriority(priorityValue);
    refreshItems(project);
    dialog.remove();
  });

  return dialog;
}

function renderItem(item, project) {
  // declarations
  const mainContainer = document.querySelector('.main-container');
  const itemContainer = newElement();
  const titleContainer = newElement();
  const inputCheckMark = newElement(null, 'input');
  const itemTitle = newElement(null, 'p');
  const infoContainer = newElement();
  const detailsButton = newElement(null, 'button');
  const dueDate = newElement(null, 'p');
  const editButton = newElement(null, 'button');
  const deleteButton = newElement(null, 'button');
  const priorityValue = item.getPriority();

  // appends
  mainContainer.appendChild(itemContainer);
  itemContainer.append(titleContainer, infoContainer);
  titleContainer.append(inputCheckMark, itemTitle);
  infoContainer.append(
    detailsButton,
    dueDate,
    dueDate,
    editButton,
    deleteButton
  );

  // data
  itemContainer.classList.add('todo-item');
  inputCheckMark.setAttribute('type', 'checkbox');
  inputCheckMark.checked = item.getStatus();
  itemTitle.textContent = item.getTitle();
  detailsButton.textContent = 'Details';
  dueDate.textContent = item.getDueDate();
  editButton.textContent = 'Edit';
  deleteButton.textContent = 'Delete';

  // Checks
  setTodoPriorityClass(priorityValue, itemContainer);
  isTodoDone(inputCheckMark, itemTitle, dueDate, itemContainer);

  // Listeners
  inputCheckMark.addEventListener('click', () => {
    itemTitle.classList.toggle('strikethrough');
    dueDate.classList.toggle('strikethrough');
    itemContainer.classList.toggle('task-priority-null');
    item.switchStatus();
  });
  detailsButton.addEventListener('click', () => {
    const dialog = renderDetailsDialog(item, project);
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
        dialog.remove();
      }
    });
  });
  editButton.addEventListener('click', () => {
    const dialog = renderEditDialog(item, project);
    mainContainer.appendChild(dialog);
    dialog.showModal();
  });
  deleteButton.addEventListener('click', () => {
    const index = Array.from(project.getTodos()).indexOf(item);
    itemContainer.remove();
    project.removeTodo(index);
  });
}

function todoDialog(project) {
  // declarations
  const dialog = newElement(null, 'dialog');
  const inputContainer = newElement(null, 'div');
  const inputTitle = newElement(null, 'input');
  const inputDescription = newElement(null, 'input');
  const dateContainer = newElement(null, 'div');
  const inputDate = newElement(null, 'input');
  const priorityContainer = newElement(null, 'div');
  const buttonPriority = [
    newElement('', 'button'),
    newElement('', 'button'),
    newElement('', 'button'),
  ];
  const buttonPriorityContainer = newElement(null, 'div');
  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');
  let priorityValue = 0;

  // appends
  inputContainer.append(inputTitle, inputDescription);
  dateContainer.append(newElement('Due Date:', 'p'), inputDate);
  dialog.append(
    inputContainer,
    dateContainer,
    priorityContainer,
    buttonContainer
  );
  buttonPriorityContainer.append(
    buttonPriority[0],
    buttonPriority[1],
    buttonPriority[2]
  );
  priorityContainer.append(
    newElement('Priority:', 'p'),
    buttonPriorityContainer
  );
  buttonContainer.append(buttonCancel, buttonConfirm);

  // data
  dialog.classList.add('modal-input');
  inputTitle.setAttribute('placeholder', 'Title');
  inputDescription.setAttribute('placeholder', 'Description');
  inputTitle.setAttribute('type', 'text');
  inputDescription.setAttribute('type', 'text');
  inputDate.setAttribute('type', 'date');
  buttonPriority[0].classList.add('button-priority-low');
  buttonPriority[1].classList.add('button-priority-medium');
  buttonPriority[2].classList.add('button-priority-high');
  buttonContainer.classList.add('button-container');

  resetPriorityButton(buttonPriorityContainer);
  buttonPriority[0].classList.remove('button-priority-null');

  // listeners
  buttonPriority[0].addEventListener('click', () => {
    priorityValue = 0;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[0].classList.toggle('button-priority-null');
  });
  buttonPriority[1].addEventListener('click', () => {
    priorityValue = 1;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[1].classList.toggle('button-priority-null');
  });
  buttonPriority[2].addEventListener('click', () => {
    priorityValue = 2;
    resetPriorityButton(buttonPriorityContainer);
    buttonPriority[2].classList.toggle('button-priority-null');
  });
  buttonCancel.addEventListener('click', () => {
    dialog.remove();
  });
  buttonConfirm.addEventListener('click', () => {
    if (inputTitle.value === '') inputTitle.value = 'New task';
    project.addTodo(
      inputTitle.value,
      inputDescription.value,
      inputDate.value,
      priorityValue,
      false
    );
    dialog.remove();
    refreshItems(project);
  });

  return dialog;
}

function renderNewTodoButton(project) {
  const mainContainer = document.querySelector('.main-container');
  const button = newElement(`Add new Task to ${project.getTitle()}`, 'button');

  mainContainer.appendChild(button);
  button.id = 'new-todo';

  button.addEventListener('click', () => {
    const dialog = todoDialog(project);

    mainContainer.appendChild(dialog);
    dialog.showModal();
  });
}

function editProjectDialog(project, currentTitle) {
  const dialog = newElement(null, 'dialog');
  const inputTitle = newElement(null, 'input');
  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');

  dialog.classList.add('modal-input');
  dialog.appendChild(newElement('Edit Project', 'h2'));
  inputTitle.value = project.getTitle();
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('placeholder', 'Project Title');
  dialog.appendChild(inputTitle);
  buttonContainer.appendChild(buttonCancel);
  buttonContainer.appendChild(buttonConfirm);
  dialog.appendChild(buttonContainer);

  buttonCancel.addEventListener('click', () => {
    dialog.remove();
  });

  buttonConfirm.addEventListener('click', () => {
    if (inputTitle.value === '') inputTitle.value = 'Project';

    // eslint-disable-next-line no-param-reassign
    currentTitle.textContent = inputTitle.value;
    project.setTitle(inputTitle.value);
    dialog.remove();
    refreshItems(project);
  });

  return dialog;
}

function renderProject(project, projectCollection) {
  const projectContainer = document.querySelector('#project-container');
  const projectElement = newElement();
  const title = newElement(project.getTitle(), 'p');
  const removeButton = newElement('remove', 'button');
  const editButton = newElement('edit', 'button');
  const buttonContainer = newElement();

  projectElement.classList.add('project-item');
  projectContainer.appendChild(projectElement);
  projectElement.appendChild(title);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(removeButton);
  projectElement.appendChild(buttonContainer);

  title.addEventListener('click', () => {
    refreshItems(project);
  });

  removeButton.addEventListener('click', () => {
    const mainProject = document.querySelector('.main-project-container');
    const index = Array.from(projectCollection.getProjects().indexOf(project));

    projectElement.remove();
    mainProject.click();
    projectCollection.removeProject(index);
  });
  editButton.addEventListener('click', () => {
    const dialog = editProjectDialog(project, title);
    const mainContainer = document.querySelector('.main-container');

    mainContainer.appendChild(dialog);
    dialog.showModal();
  });
}

function renderMainProject(project) {
  const mainProjectContainer = document.querySelector(
    '.main-project-container'
  );

  mainProjectContainer.addEventListener('click', () => {
    refreshItems(project);
  });
  mainProjectContainer.click();
}

function newProjectDialog(projectCollection) {
  const dialog = newElement(null, 'dialog');
  const inputTitle = newElement(null, 'input');
  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');

  dialog.classList.add('modal-input');
  dialog.appendChild(newElement('New Project', 'h2'));
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('placeholder', 'Project Title');
  dialog.appendChild(inputTitle);
  buttonContainer.appendChild(buttonCancel);
  buttonContainer.appendChild(buttonConfirm);
  dialog.appendChild(buttonContainer);
  buttonContainer.classList.add('button-container');

  buttonCancel.addEventListener('click', () => {
    dialog.remove();
  });

  buttonConfirm.addEventListener('click', () => {
    if (inputTitle.value === '') inputTitle.value = 'New Project';

    projectCollection.addProject(inputTitle.value);
    const index = projectCollection.getProjects().length - 1;
    renderProject(projectCollection.getProjects(index), projectCollection);
    dialog.remove();
  });

  return dialog;
}

function newProject(projectCollection) {
  const addButton = document.querySelector('#add-button');

  addButton.addEventListener('click', () => {
    const mainContainer = document.querySelector('.main-container');
    const dialog = newProjectDialog(projectCollection);
    mainContainer.appendChild(dialog);
    dialog.showModal();
  });
}

function initPage() {
  renderMainProject(projectItem('Home'));
  newProject(projectList());
}

initPage();

export { renderNewTodoButton, renderItem };

import './style.css';
import { projectItem, projectList } from './todo';
// eslint-disable-next-line import/no-cycle
import { newElement, refreshItems } from './domHelper';

function renderDetailsDialog(item, project) {
  const dialog = newElement(null, 'dialog');
  dialog.classList.add('modal-details');
  dialog.appendChild(newElement(item.getTitle(), 'h1'));
  dialog.appendChild(newElement(item.getDescription(), 'em'));
  const title = newElement();
  const dueDate = newElement();
  const priority = newElement();

  title.appendChild(newElement('Project:', 'p'));
  title.appendChild(newElement(project.getTitle(), 'p'));

  dueDate.appendChild(newElement('Due date:', 'p'));
  dueDate.appendChild(newElement(item.getDueDate(), 'p'));

  priority.appendChild(newElement('Priority:', 'p'));
  let priorityValue;
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
  const dialog = newElement(null, 'dialog');
  dialog.classList.add('modal-input');

  const inputContainer = newElement(null, 'div');
  const inputTitle = newElement(null, 'input');
  const inputDescription = newElement(null, 'input');
  inputTitle.setAttribute('type', 'text');
  inputDescription.setAttribute('type', 'text');
  inputContainer.appendChild(inputTitle);
  inputContainer.appendChild(inputDescription);
  dialog.appendChild(inputContainer);

  const dateContainer = newElement(null, 'div');
  dateContainer.appendChild(newElement('Due Date:', 'p'));
  const inputDate = newElement(null, 'input');
  inputDate.setAttribute('type', 'date');
  dateContainer.appendChild(inputDate);
  dialog.appendChild(dateContainer);

  const priorityContainer = newElement(null, 'div');
  priorityContainer.appendChild(newElement('Priority:', 'p'));
  const buttonPriorityLow = newElement('Low', 'button');
  buttonPriorityLow.classList.add('button-priority-low');
  const buttonPriorityMedium = newElement('Medium', 'button');
  buttonPriorityMedium.classList.add('button-priority-medium');
  const buttonPriorityHigh = newElement('High', 'button');
  buttonPriorityHigh.classList.add('button-priority-high');
  const buttonPriorityContainer = newElement(null, 'div');
  buttonPriorityContainer.appendChild(buttonPriorityLow);
  buttonPriorityContainer.appendChild(buttonPriorityMedium);
  buttonPriorityContainer.appendChild(buttonPriorityHigh);
  priorityContainer.appendChild(buttonPriorityContainer);
  dialog.appendChild(priorityContainer);

  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');
  buttonContainer.appendChild(buttonCancel);
  buttonContainer.appendChild(buttonConfirm);
  dialog.appendChild(buttonContainer);

  inputTitle.value = item.getTitle();
  inputDescription.value = item.getDescription();
  inputDate.value = item.getDueDate();
  let priorityValue = item.getPriority();

  const resetPriorityButton = () => {
    Array.from(buttonPriorityContainer.children).forEach((button) => {
      button.classList.remove('button-priority-null');
      button.classList.add('button-priority-null');
    });
  };

  if (priorityValue === 0) {
    resetPriorityButton();
    buttonPriorityLow.classList.toggle('button-priority-null');
  }
  if (priorityValue === 1) {
    resetPriorityButton();
    buttonPriorityMedium.classList.toggle('button-priority-null');
  }
  if (priorityValue === 2) {
    resetPriorityButton();
    buttonPriorityHigh.classList.toggle('button-priority-null');
  }

  buttonPriorityLow.addEventListener('click', () => {
    priorityValue = 0;
    resetPriorityButton();
    buttonPriorityLow.classList.toggle('button-priority-null');
  });
  buttonPriorityMedium.addEventListener('click', () => {
    priorityValue = 1;
    resetPriorityButton();
    buttonPriorityMedium.classList.toggle('button-priority-null');
  });
  buttonPriorityHigh.addEventListener('click', () => {
    priorityValue = 2;
    resetPriorityButton();
    buttonPriorityHigh.classList.toggle('button-priority-null');
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
  const mainContainer = document.querySelector('.main-container');
  const itemContainer = newElement();
  itemContainer.classList.add('todo-item');
  if (item.getPriority() === 0)
    itemContainer.classList.add('task-priority-low');
  if (item.getPriority() === 1)
    itemContainer.classList.add('task-priority-medium');
  if (item.getPriority() === 2)
    itemContainer.classList.add('task-priority-high');

  const titleContainer = newElement();
  const inputCheckMark = newElement(null, 'input');
  const itemTitle = newElement(null, 'p');
  const infoContainer = newElement();
  const detailsButton = newElement(null, 'button');
  const dueDate = newElement(null, 'p');
  const editButton = newElement(null, 'button');
  const deleteButton = newElement(null, 'button');

  inputCheckMark.setAttribute('type', 'checkbox');
  inputCheckMark.checked = item.getStatus();
  if (inputCheckMark.checked) {
    itemTitle.classList.add('strikethrough');
    dueDate.classList.add('strikethrough');
    itemContainer.classList.add('task-priority-null');
  }

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
    itemContainer.appendChild(dialog);
    dialog.showModal();
  });

  deleteButton.addEventListener('click', () => {
    itemContainer.remove();
    const index = Array.from(project.getTodos()).indexOf(item);
    project.removeTodo(index);
  });
}

function todoDialog(project) {
  const dialog = newElement(null, 'dialog');
  dialog.classList.add('modal-input');

  const inputContainer = newElement(null, 'div');
  const inputTitle = newElement(null, 'input');
  inputTitle.setAttribute('placeholder', 'Title');
  const inputDescription = newElement(null, 'input');
  inputDescription.setAttribute('placeholder', 'Description');
  inputTitle.setAttribute('type', 'text');
  inputDescription.setAttribute('type', 'text');
  inputContainer.appendChild(inputTitle);
  inputContainer.appendChild(inputDescription);
  dialog.appendChild(inputContainer);

  const dateContainer = newElement(null, 'div');
  dateContainer.appendChild(newElement('Due Date:', 'p'));
  const inputDate = newElement(null, 'input');
  inputDate.setAttribute('type', 'date');
  dateContainer.appendChild(inputDate);
  dialog.appendChild(dateContainer);

  const priorityContainer = newElement(null, 'div');
  priorityContainer.appendChild(newElement('Priority:', 'p'));
  const buttonPriorityLow = newElement('Low', 'button');
  buttonPriorityLow.classList.add('button-priority-low');
  const buttonPriorityMedium = newElement('Medium', 'button');
  buttonPriorityMedium.classList.add('button-priority-medium');
  const buttonPriorityHigh = newElement('High', 'button');
  buttonPriorityHigh.classList.add('button-priority-high');
  const buttonPriorityContainer = newElement(null, 'div');
  buttonPriorityContainer.appendChild(buttonPriorityLow);
  buttonPriorityContainer.appendChild(buttonPriorityMedium);
  buttonPriorityContainer.appendChild(buttonPriorityHigh);
  priorityContainer.appendChild(buttonPriorityContainer);
  dialog.appendChild(priorityContainer);

  const buttonContainer = newElement(null, 'div');
  const buttonConfirm = newElement('Confirm', 'button');
  const buttonCancel = newElement('Cancel', 'button');
  buttonContainer.appendChild(buttonCancel);
  buttonContainer.appendChild(buttonConfirm);
  dialog.appendChild(buttonContainer);

  const resetPriorityButton = () => {
    Array.from(buttonPriorityContainer.children).forEach((button) => {
      button.classList.remove('button-priority-null');
      button.classList.add('button-priority-null');
    });
  };

  let priorityValue = 0;
  resetPriorityButton();
  buttonPriorityLow.classList.remove('button-priority-null');

  buttonPriorityLow.addEventListener('click', () => {
    priorityValue = 0;
    resetPriorityButton();
    buttonPriorityLow.classList.toggle('button-priority-null');
  });
  buttonPriorityMedium.addEventListener('click', () => {
    priorityValue = 1;
    resetPriorityButton();
    buttonPriorityMedium.classList.toggle('button-priority-null');
  });
  buttonPriorityHigh.addEventListener('click', () => {
    priorityValue = 2;
    resetPriorityButton();
    buttonPriorityHigh.classList.toggle('button-priority-null');
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

function renderProject(project, projectCollection) {
  const projectContainer = document.querySelector('#project-container');
  const projectElement = newElement();
  projectElement.classList.add('project-item');
  projectContainer.appendChild(projectElement);
  const projectTitle = newElement(project.getTitle(), 'p');
  const removeButton = newElement('remove', 'button');

  projectElement.appendChild(projectTitle);
  projectElement.appendChild(removeButton);

  projectTitle.addEventListener('click', () => {
    refreshItems(project);
  });

  removeButton.addEventListener('click', () => {
    const mainProject = document.querySelector('.main-project-container');
    projectElement.remove();
    mainProject.click();
    const index = Array.from(projectCollection.getProjects().indexOf(project));
    projectCollection.removeProject(index);
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

function newProject(projectCollection) {
  const addButton = document.querySelector('#add-button');
  addButton.addEventListener('click', () => {
    // TODO dialog for project title input
    projectCollection.addProject('New Project');
    const index = projectCollection.getProjects().length - 1;
    renderProject(projectCollection.getProjects(index), projectCollection);
  });
}

function initPage(blankMode = true) {
  if (blankMode === true) {
    renderMainProject(projectItem('Home'));
    newProject(projectList());
    return;
  }
  const defaultProject = projectItem('default project');
  defaultProject.addTodo('one', 'description', '1997-06-21', 0, false);
  defaultProject.addTodo('two', 'description', '1995-02-15', 1, true);
  defaultProject.addTodo('three', 'description', '1989-05-04', 2, false);
  const projectContainer = projectList();
  const projects = projectContainer.getProjects();
  projectContainer.addProject('new project');
  projectContainer.addProject('another project');
  projects[0].addTodo('task 0', 'new description', '2023-08-23', 0, false);
  projects[0].addTodo('task 1', 'new description', '2022-07-24', 1, false);
  projects[0].addTodo('task 2', 'new description', '2021-06-25', 2, false);
  projects[0].addTodo('task 3', 'new description', '2020-05-26', 2, true);
  projects[1].addTodo('task 4', 'new description', '2019-04-27', 0, false);
  projects[1].addTodo('task 5', 'new description', '2018-03-28', 1, false);
  projects[1].addTodo('task 6', 'new description', '2017-03-29', 2, false);
  projects[1].addTodo('task 7', 'new description', '2016-03-30', 2, true);

  renderMainProject(defaultProject);
  projectContainer.getProjects().forEach((project) => {
    renderProject(project, projectContainer);
  });
}

initPage();

export { renderNewTodoButton, renderItem };

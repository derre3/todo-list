/* eslint-disable no-param-reassign */
// a to-do item is an object containing:
// title, description,due date, priority
// status is either done(true) or not(false)
const todoItem = (title, description, dueDate, priority, status) => {
  const getTitle = () => title;
  const setTitle = (value) => {
    title = value;
  };

  const getDescription = () => description;
  const setDescription = (value) => {
    description = value;
  };

  const getDueDate = () => dueDate;
  const setDueDate = (value) => {
    dueDate = value;
  };

  const getPriority = () => priority;
  const setPriority = (value) => {
    priority = value;
  };

  const getStatus = () => status;
  const switchStatus = () => {
    if (status) status = false;
    else status = true;
  };

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getStatus,
    switchStatus,
  };
};

// a project item contains the to-do items
// has a title
// items is an array containing the to-do items
const projectItem = (projectTitle, items = []) => {
  const getTitle = () => projectTitle;
  const setTitle = (value) => {
    projectTitle = value;
  };
  const getTodos = (index) => {
    // the index of the array can be accessed directly
    // through the function in case it's not stored
    // in a array
    if (index == null) return items;
    return items[index];
  };
  // creates a new todo and stores it in the current project array
  const addTodo = (title, description, dueDate, priority, status) => {
    const todo = todoItem(title, description, dueDate, priority, status);
    items.push(todo);
  };
  const removeTodo = (index) => {
    items.splice(index, 1);
  };

  return {
    getTitle,
    setTitle,
    getTodos,
    addTodo,
    removeTodo,
  };
};

// contains all the projects created
const projectList = (items = []) => {
  const getProjects = (index) => {
    // the index of the array can be accessed directly
    // through the function in case it's not stored
    // in a array
    if (index == null) return items;
    return items[index];
  };
  // creates a new project and stores it in the current project-container array
  const addProject = (projectTitle) => {
    const project = projectItem(projectTitle);
    items.push(project);
  };
  const removeProject = (index) => {
    items.splice(index, 1);
  };

  return {
    getProjects,
    addProject,
    removeProject,
  };
};

export { projectItem, projectList };

// a to-do item is an object containing:
// title, description,due date, priority
// status is either done(true) or not(false)
const todoItem = (title, description, dueDate, priority, status) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getStatus = () => status;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getStatus,
  };
};

// a project item contains the to-do items
// has a title
// items is an array containing the to-do items
const projectItem = (title, items = []) => {
  const getTitle = () => title;
  const getItems = () => items;
  const add = (todo) => items.push(todo);

  return {
    getTitle,
    getItems,
    add,
  };
};

// contains all the projects created
const projectList = (items = []) => {
  const getItems = () => items;
  const add = (project) => items.push(project);

  return {
    getItems,
    add,
  };
};

export { todoItem, projectItem, projectList };

import './style.css';
import { projectItem, projectList } from './todo';

// default project will always be present
// it's where to-dos not linked to any project will go
const defaultProject = projectItem('default project');
defaultProject.addTodo('title', 'description', 'due date', 0);
console.log(defaultProject.getTodos(0).getTitle());

const projectContainer = projectList();
const projects = projectContainer.getProjects();
projectContainer.addProject('new project');
projects[0].addTodo('new title', 'new description', 'new due date', 1);
console.log(projects[0].getTitle());

import { TaskList } from './Task.js';
import { getSelectedTask, backToMain } from './mini-library.js';

const task = getSelectedTask(TaskList);

const form = document.querySelector('form.edit-task-form');
const list = TaskList.fromJson(JSON.parse(localStorage.getItem('Tasks')));

if(task) {
    document.getElementById('edit-task-name').value = task.getName();
    document.getElementById('edit-task-description').value = task.getDescription();
}

form.addEventListener('submit', changeInfo);

function changeInfo(event) {
    event.preventDefault();

    const newName = document.getElementById('edit-task-name').value;
    const newDescription = document.getElementById('edit-task-description').value;

    const updatedTask = list.Find(task.getId());
    
    if (updatedTask) {
        updatedTask.setName(newName);
        updatedTask.setDescription(newDescription);
    }

    localStorage.setItem('Tasks', JSON.stringify(list.toJson()));
    window.location.href = '/index.html';
}

backToMain();
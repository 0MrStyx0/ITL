import { TaskList } from './Task.js';
import { getSelectedTask, backToMain, validateTask } from './mini-library.js';

const task = getSelectedTask(TaskList);

const form = document.querySelector('form.edit-task-form');
const list = TaskList.fromJson(JSON.parse(localStorage.getItem('Tasks')));

const taskNameInput = document.getElementById('edit-task-name');
const taskDescriptionInput = document.getElementById('edit-task-description');
const nameError = document.getElementById('edit-name-error');
const descriptionError = document.getElementById('edit-description-error');

if(task) {
    document.getElementById('edit-task-name').value = task.getName();
    document.getElementById('edit-task-description').value = task.getDescription();
}

form.addEventListener('submit', changeInfo);

taskNameInput.addEventListener('input', () => {
    validateTask(taskNameInput.value, taskDescriptionInput.value,nameError,descriptionError);
});

taskDescriptionInput.addEventListener('input', () => {
    validateTask(taskNameInput.value, taskDescriptionInput.value,nameError,descriptionError);
});

function changeInfo(event) {
    event.preventDefault();

    const newName = document.getElementById('edit-task-name').value;
    const newDescription = document.getElementById('edit-task-description').value;

    if(validateTask(newName, newDescription,nameError,descriptionError)) {
        const updatedTask = list.Find(task.getId());
    
        if (updatedTask) {
            updatedTask.setName(newName);
            updatedTask.setDescription(newDescription);
        }
    
        localStorage.setItem('Tasks', JSON.stringify(list.toJson()));
        window.location.href = '/index.html';
    }
}

backToMain();
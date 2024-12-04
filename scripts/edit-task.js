import { TaskList } from './Task.js';
import { getSelectedTask, backToMain } from './mini-library.js';

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
    validateTask(taskNameInput.value, taskDescriptionInput.value);
});

taskDescriptionInput.addEventListener('input', () => {
    validateTask(taskNameInput.value, taskDescriptionInput.value);
});

function changeInfo(event) {
    event.preventDefault();

    const newName = document.getElementById('edit-task-name').value;
    const newDescription = document.getElementById('edit-task-description').value;

    if(validateTask(newName, newDescription)) {
        const updatedTask = list.Find(task.getId());
    
        if (updatedTask) {
            updatedTask.setName(newName);
            updatedTask.setDescription(newDescription);
        }
    
        localStorage.setItem('Tasks', JSON.stringify(list.toJson()));
        window.location.href = '/index.html';
    }
}

function validateTask(title, description) {
    const titlePattern = /^(?=.*\D)([a-zA-Zа-яА-Я0-9]+( [a-zA-Zа-яА-Я0-9]+)+)$/;
    const descriptionPattern = /^(?!\s*$).+/;

    let isValid = true;
    
    
    if (!titlePattern.test(title.trim())) {
        nameError.textContent = "Title must contain at least two words.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    
    if (!descriptionPattern.test(description.trim())) {
        descriptionError.textContent = "Description cannot be empty.";
        isValid = false;
    } else if (title.trim() === description.trim()) {
        descriptionError.textContent = "Description cannot match the title.";
        isValid = false;
    } else {
        descriptionError.textContent = "";
    }

    return isValid;
}

backToMain();
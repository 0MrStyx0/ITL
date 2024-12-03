import {Task , TaskList} from './Task.js';

const form = document.querySelector('form.add-task');
const taskNameInput = form.querySelector('input.task-name');
const taskDescriptionInput = form.querySelector('input.task-description');
const tasksList = document.querySelector('ol.tasks-list');
const emptyList = document.querySelector('div.empty-list');

const list = new TaskList();

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;

    const task = new Task(taskName, taskDescription);
    list.addTask(task);

    const taskHtml = `<li id="${task.getId()}">${task.getName()}
                    <input type="checkbox" data-action="done">
                    <button class="edit">Edit</button>
                    <button class="delete" data-action="delete">Delete</button>
                </li>`;


    tasksList.insertAdjacentHTML('beforeend',taskHtml);

    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    saveToLocalStorage();
    checkEmptyList();
}

function deleteTask(event) {
    if(event.target.dataset.action === 'delete') {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        let taskIndex;

        list.FindIndex(taskIndex,taskIdHTML);
        list.Splice(taskIndex);
        task.remove();
        saveToLocalStorage();
    }
    checkEmptyList();
}

function doneTask(event) {
    if(event.target.dataset.action === "done") {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        const doneTask = list.Find(taskIdHTML);

        if(doneTask.getStatus() === false) {
            doneTask.setStatus(true);
        }
        else {
            doneTask.setStatus(false);
        }

        saveToLocalStorage();
    }
}

function checkEmptyList() {
    if(list.getLength() === 0) {
        emptyList.style.display = 'block';
    }
    else {
        emptyList.style.display = 'none';
    }
}

function saveToLocalStorage() {
    localStorage.setItem('Tasks',JSON.stringify(list.toJson()));
}
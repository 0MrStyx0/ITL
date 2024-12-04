import {Task , TaskList} from './Task.js';

const form = document.querySelector('form.add-task');
const taskNameInput = form.querySelector('input.task-name');
const taskDescriptionInput = form.querySelector('input.task-description');
const tasksList = document.querySelector('ol.tasks-list');
const emptyList = document.querySelector('div.empty-list');

const list = loadFromLocalStorage();
list.ForEach(renderTask);

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

tasksList.addEventListener('click', editTask);

function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;

    const task = new Task(taskName, taskDescription);
    list.addTask(task);

    renderTask(task);

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

function editTask(event) {
    if(event.target.dataset.action === "edit") {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        window.location.href = `pages/edit/edit.html?id=${taskIdHTML}`;
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

function loadFromLocalStorage() {
    const data = localStorage.getItem('Tasks');

    if (data !== null) {
        const parsedData = JSON.parse(data);
        return TaskList.fromJson(parsedData);
    } 
    else {
        return new TaskList();
    }
}

function renderTask(task) {

    const taskHtml = `<li id="${task.getId()}">
                    <a href="/pages/details/details.html?id=${task.getId()}" class="task-details">${task.getName()}</a>
                    <input type="checkbox" data-action="done" ${task.getStatus() ? 'checked' : ''}>
                    <button class="edit" data-action="edit">Edit</button>
                    <button class="delete" data-action="delete">Delete</button>
                </li>`;


tasksList.insertAdjacentHTML('beforeend',taskHtml);
checkEmptyList();
}
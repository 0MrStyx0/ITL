import {Task , TaskList} from './Task.js';

const form = document.querySelector('form.add-task');
const taskNameInput = form.querySelector('input.task-name');
const taskDescriptionInput = form.querySelector('input.task-description');
const tasksList = document.querySelector('ol.tasks-list');
const emptyList = document.querySelector('div.empty-list');

const sortSelect = document.getElementById('sort-tasks');
const filterSelect = document.getElementById('filter-tasks');



const list = loadFromLocalStorage();
list.ForEach(renderTask);

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

tasksList.addEventListener('click', editTask);

sortSelect.addEventListener('change', updateTaskList);

filterSelect.addEventListener('change', updateTaskList);

function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskName && taskDescription) {
        const task = new Task(taskName, taskDescription);
        list.addTask(task);
        saveToLocalStorage();
        updateTaskList();
    }

    taskNameInput.value = "";
    taskDescriptionInput.value = "";
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
    if (event.target.dataset.action === "done") {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        const doneTask = list.Find(taskIdHTML);

        if (doneTask) {
            doneTask.setStatus(!doneTask.getStatus());
            saveToLocalStorage();
            updateTaskList();
        }
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

function updateTaskList() {
    const sortedFilteredTasks = getSortedFilteredTasks();
    tasksList.innerHTML = '';
    sortedFilteredTasks.ForEach(renderTask);
}

function getSortedFilteredTasks() {
    let tasks = list.getTasks();

    const filterValue = filterSelect.value;
    if (filterValue === 'done') {
        tasks = tasks.filter(task => task.getStatus() === true);
    } else if (filterValue === 'undone') {
        tasks = tasks.filter(task => task.getStatus() === false);
    }

    const sortValue = sortSelect.value;
    if (sortValue === 'date') {
        tasks.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
    } else if (sortValue === 'name') {
        tasks.sort((a, b) => a.getName().localeCompare(b.getName()));
    }

    const sortedFilteredTaskList = new TaskList();
    tasks.forEach(task => sortedFilteredTaskList.addTask(task));

    return sortedFilteredTaskList;
}
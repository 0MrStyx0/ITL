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

    if(tasksList.children.length > 0) {
        emptyList.style.display = 'none';
    }
}

function deleteTask(event) {
    if(event.target.dataset.action === 'delete') {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        let taskIndex;
        list.getList().findIndex(function (task, index) {
            if(task.getId() === taskIdHTML) {
                taskIndex = index;
            }
        });

        list.getList().splice(taskIndex,1);

        task.remove();

        if(tasksList.children.length === 0) {
            emptyList.style.display = 'block';
        }
    }
}

function doneTask(event) {
    if(event.target.dataset.action === "done") {
        const task = event.target.closest('li');
        const taskIdHTML = task.id;
        const doneTask = list.getList().find(function (task) {
            if(task.getId() === taskIdHTML) {
                return true;
            }
        });

        if(doneTask.getStatus() === false) {
            doneTask.setStatus(true);
        }
        else {
            doneTask.setStatus(false);
        }

        console.log(doneTask);
    }
}
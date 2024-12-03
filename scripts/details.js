import { TaskList } from './Task.js';

const params = new URLSearchParams(window.location.search);
const taskId = params.get('id');
const list = TaskList.fromJson(JSON.parse(localStorage.getItem('Tasks')));

const task = list.Find(taskId);

if (task) {
    document.getElementById('task-name').textContent = task.getName();
    document.getElementById('task-description').textContent = task.getDescription();
    document.getElementById('task-date').textContent = `Created on: ${task.getDate()}`;
    if(task.getStatus()) {
        document.getElementById('task-status').textContent = "Status: Done"
    }
    else {
        document.getElementById('task-status').textContent = "Status: Undone"
    }
    
}

document.getElementById('back').addEventListener('click', function() {
    window.location.href = '/index.html';
})
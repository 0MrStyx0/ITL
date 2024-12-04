import { TaskList } from './Task.js';
import { getSelectedTask, backToMain } from './mini-library.js';

const task = getSelectedTask(TaskList);

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

backToMain();
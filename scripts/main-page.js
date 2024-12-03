const form = document.querySelector('form.add-task');
const taskNameInput = form.querySelector('input.task-name');
const taskDescriptionInput = form.querySelector('input.task-description');
const tasksList = document.querySelector('ol.tasks-list');
const emptyList = document.querySelector('div.empty-list');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;

    const taskHtml = `<li>${taskName}
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
        task.remove();

        if(tasksList.children.length === 0) {
            emptyList.style.display = 'block';
        }
    }
}
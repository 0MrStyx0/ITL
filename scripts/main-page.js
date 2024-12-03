const form = document.querySelector('form.add-task');
const taskNameInput = form.querySelector('input.task-name');
const taskDescriptionInput = form.querySelector('input.task-description');
const tasksList = document.querySelector('ol.tasks-list');

form.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();

    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;

    const taskHtml = `<li>${taskName}
                    <input type="checkbox">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </li>`;


    tasksList.insertAdjacentHTML('beforeend',taskHtml);

    taskNameInput.value = "";
    taskDescriptionInput.value = "";
}
export function getSelectedTask(TaskList) {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');
    const list = TaskList.fromJson(JSON.parse(localStorage.getItem('Tasks')));

    const task = list.Find(taskId);

    return task;
}

export function backToMain() {
    document.getElementById('back').addEventListener('click', function() {
        window.location.href = '/index.html';
    })
}

export function validateTask(title, description,nameError,descriptionError) {
    const titlePattern = /^(?=.*[a-zA-Zа-яА-Я])([a-zA-Zа-яА-Я0-9]+( [a-zA-Zа-яА-Я0-9]+)+)$/;
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
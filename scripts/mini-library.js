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
 export class Task {
    #id;
    #name;
    #description;
    #date;
    #status = false;

    constructor(name, description){
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#description = description;
        this.#date = this.#setDate();
    }

    #setDate() {
        const now = new Date();
  
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = now.getFullYear();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    getName() {
        return this.#name;
    }

    getId() {
        return this.#id;
    }

    getStatus() {
        return this.#status;
    }

    getDescription() {
        return this.#description;
    }

    getDate() {
        return this.#date;
    }

    setStatus(status) {
        this.#status = status;
    }

    setDate(date) {
        this.#date = date;
    }

    setId(Id) {
        this.#id = Id;
    }
}

export class TaskList {
    #list = [];

    addTask(task) {
        this.#list.push(task);
    }

    FindIndex(taskIndex,taskIdHTML) {
        this.#list.findIndex(function (task, index) {
            if(task.getId() === taskIdHTML) {
                taskIndex = index;
            }
        });
    }

    Find(taskIdHTML) {
        return this.#list.find(function (task) {
            if(task.getId() === taskIdHTML) {
                return true;
            }
        });
    }

    Splice(taskIndex) {
        this.#list.splice(taskIndex,1);
    }

    ForEach(renderTask) {
        this.#list.forEach(function(task) {
            renderTask(task);
        })
    }

    getLength() {
        return this.#list.length;
    }

    toJson() {
        return {
            data: this.#list.map(function(task) {
                return {
                    id: task.getId(),
                    name: task.getName(),
                    description: task.getDescription(),
                    date: task.getDate(),              
                    status: task.getStatus()
                }
            })
        }
    }

    static fromJson(data) {
        const taskList = new TaskList();

        data.data.forEach(item => {
            const task = new Task(item.name, item.description);
            task.setStatus(item.status);
            task.setDate(item.date);
            task.setId(item.id);
            taskList.addTask(task);
        });
    
        return taskList;
    }
}
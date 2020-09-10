"use strict"

const dateSpan = document.getElementById("date")
const submitBtn = document.getElementById("submitBtn")
const taskInput = document.getElementById("taskInput")
const taskContainer = document.getElementById("taskContainer")

let tasks = []

let date = new Date()
let dateString = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
dateSpan.innerHTML = dateString

class Task {
    constructor(description, isComplete, id) {
        this.description = description
        this.isComplete = isComplete
        this.id = id
    }

    buildElement() {
        let taskShell = document.createElement('div')
        taskShell.id = this.id

        let taskText = document.createElement('p')
        taskText.innerHTML = this.description

        let xButton = document.createElement("div")
        xButton.innerHTML = "X"
        xButton.className = 'x-button'

        if (this.isComplete) {
            taskShell.className = "task task-done"
        } else {
            taskShell.className = "task"
        }

        taskShell.appendChild(taskText);
        taskShell.appendChild(xButton);
        return taskShell
    }

    complete() {
        this.isComplete = true
    }
}

submitBtn.onclick = () => {
    let description = taskInput.value

    if(description == "") {
        alert("Include task description")
        return
    }
    tasks.push(new Task(description, false, tasks.length))

    taskInput.value = ""
    displayTasks()
}

taskContainer.onclick = (event) => {
    let taskShell = event.path[event.path.length - 7]
    let task = tasks[taskShell.id]

    console.log(task)

    if(event.target.className == "x-button") {
        console.log("X button")
        removeTask(task)
    } else if(event.target.nodeName  == "P") {
        console.log("Description")
        task.complete()
    }

    displayTasks()
}

const displayTasks = () => {
    taskContainer.innerHTML = "";

    let taskShells = tasks.map( task => {
        return task.buildElement()
    })

    taskShells.forEach( taskShell => taskContainer.append(taskShell) );
}

const removeTask = (task) => {
    let index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }

    tasks.forEach( (task, i) => {
        task.id = i
    })
}

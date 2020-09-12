"use strict"

const dateSpan = document.getElementById("date")
const submitBtn = document.getElementById("submitBtn")
const taskInput = document.getElementById("taskInput")
const taskContainer = document.getElementById("taskContainer")

let date = new Date()
let dateString = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
dateSpan.innerHTML = dateString

const createNewTask = function (description) {
    let taskShell = document.createElement('div')
    taskShell.className = "task"

    let taskText = document.createElement('p')
    taskText.innerHTML = description

    let xButton = document.createElement("div")
    xButton.innerHTML = "✖"
    xButton.className = 'x-button'

    xButton.onclick = function() {
        this.parentElement.remove()
    }
    taskShell.onclick = function() {
        this.className = "task task-done"
    }

    taskShell.appendChild(taskText)
    taskShell.appendChild(xButton)
    return taskShell
}

submitBtn.onclick = () => {
    let description = taskInput.value

    if(description == "") {
        alert("Include task description")
        return
    }
    
    taskInput.value = ""
    taskContainer.appendChild(createNewTask(description))
}
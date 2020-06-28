// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// Functions

function createTodoItem(itemValue) {
    // Create div with todo class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create list item
    const newTodo = document.createElement("li");
    newTodo.innerText = itemValue;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
}

function addTodo(event) {
    // Prevent form from submitting and refresh page
    event.preventDefault();
    if (todoInput.value != "") {
        // Create Todo Item
        createTodoItem(todoInput.value);
        // Add todo to local storage
        saveLocalTodos(todoInput.value);
        // Clear Todo Input value
        todoInput.value = "";
    } else {
        alert("Please fill the blank with some text");
    }
}

function deleteCheck(event) {
    const item = event.target;
    // Delete todo item
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeFromLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    // Complete todo item
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function checkLocalTodos() {
    // Check current local storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function saveLocalTodos(todo) {
    let todos = checkLocalTodos();
    // Append new todo
    todos.push(todo);
    // Save todos list to array in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos = checkLocalTodos();
    // Add Todos by passing over every item
    todos.forEach(function (todo) {
        // Create todo item
        createTodoItem(todo);
    });
}

function removeFromLocalTodos(todo) {
    let todos = checkLocalTodos();
    // Remove todo by searching for text
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

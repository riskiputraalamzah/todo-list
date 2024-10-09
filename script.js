// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");
    const newTaskInput = document.getElementById("new-task");

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        const taskText = newTaskInput.value.trim(); // Get the task text

        if (taskText !== "") {
            addTask(taskText); // Add the task to the list
            newTaskInput.value = ""; // Clear the input
        }
    });

    // Function to add a task to the list
    function addTask(task) {
        const li = document.createElement("li"); // Create a new list item
        li.textContent = task; // Set the text content to the task

        // Create a "Done" button
        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.className = "done-button";

        // Add click event to the "Done" button
        doneButton.addEventListener("click", () => {
            li.classList.toggle("completed"); // Toggle completed class
            doneButton.textContent = li.classList.contains("completed") ? "Undo" : "Done"; // Update button text
        });

        // Create a "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        // Add click event to the "Delete" button
        deleteButton.addEventListener("click", () => {
            todoList.removeChild(li); // Remove the task from the list
        });

        // Append buttons to the list item
        li.appendChild(doneButton);
        li.appendChild(deleteButton);
        
        // Append the new task to the list
        todoList.appendChild(li);
    }
});
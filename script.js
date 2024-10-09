// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const showCompletedBtn = document.getElementById("show-completed");
    const showDeletedBtn = document.getElementById("show-deleted");
  
    let showCompleted = false;
    let deletedTasks = []; // Array to store deleted tasks
  
    // Function to add a new task
    function addTask(task) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
  
        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = task;
  
        // Complete task button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Selesai";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            li.classList.toggle("completed");
            undoBtn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
        });
  
        // Undo task button (initially hidden)
        const undoBtn = document.createElement("button");
        undoBtn.textContent = "Undo";
        undoBtn.classList.add("undo-btn");
        undoBtn.style.display = "none"; // Hidden initially
        undoBtn.addEventListener("click", () => {
            li.classList.remove("completed");
            undoBtn.style.display = "none"; // Hide Undo button after undone
        });
  
        // Delete task button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.classList.add("remove-btn");
        deleteBtn.addEventListener("click", () => {
            deletedTasks.push(task); // Save deleted task to array
            todoList.removeChild(li);
        });
  
        // Append elements to list item
        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(undoBtn);
        li.appendChild(deleteBtn);
  
        // Add list item to the list
        todoList.appendChild(li);
    }
  
    // Handle form submit event
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
  
        const task = taskInput.value.trim();
  
        if (task) {
            addTask(task); // Add task to the list
            taskInput.value = ""; // Clear input field
        }
    });
  
    // Toggle visibility of completed tasks
    showCompletedBtn.addEventListener("click", () => {
        const items = todoList.querySelectorAll(".todo-item");
        showCompleted = !showCompleted;
  
        items.forEach(item => {
            if (item.classList.contains("completed")) {
                item.style.display = showCompleted ? "flex" : "none";
            }
        });
  
        showCompletedBtn.textContent = showCompleted ? "Sembunyikan" : "Tunjukkan";
    });
  
    // Show the deleted tasks in an alert (or you can modify this to display them elsewhere)
    showDeletedBtn.addEventListener("click", () => {
        if (deletedTasks.length > 0) {
            alert("Deleted tasks:\n" + deletedTasks.join("\n"));
        } else {
            alert("Tidak ada tugas yang dihapus.");
        }
    });
  });
  
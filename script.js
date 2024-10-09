// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const filterAll = document.getElementById("filter-all");
    const filterCompleted = document.getElementById("filter-completed");
    const filterPending = document.getElementById("filter-pending");
  
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    const renderTodos = (filter = "all") => {
      todoList.innerHTML = ""; // Kosongkan daftar
      todos.forEach((todo, index) => {
        if (filter === "completed" && !todo.completed) return;
        if (filter === "pending" && todo.completed) return;
  
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;
        if (todo.completed) {
          listItem.classList.add("completed");
        }
  
        const completeButton = document.createElement("button");
        completeButton.textContent = todo.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
          todo.completed = !todo.completed;
          saveTodos();
          renderTodos(filter);
        });
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          todos.splice(index, 1);
          saveTodos();
          renderTodos(filter);
        });
  
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
      });
    };
  
    const saveTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const taskText = input.value.trim();
      if (taskText === "") return;
  
      todos.push({ text: taskText, completed: false });
      saveTodos();
      input.value = ""; // Mengosongkan input
      renderTodos(); // Render daftar baru
    });
  
    filterAll.addEventListener("click", () => renderTodos("all"));
    filterCompleted.addEventListener("click", () => renderTodos("completed"));
    filterPending.addEventListener("click", () => renderTodos("pending"));
  
    renderTodos(); // Render daftar saat pertama kali dimuat
  });
  
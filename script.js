// script.js
export default class ToDoApp {
  constructor() {
    this.form = document.getElementById("todo-form");
    this.todoInput = document.getElementById("new-task");
    this.taskCategory = document.getElementById("task-category");
    this.todoList = document.getElementById("todo-list");
    this.filterSelect = document.getElementById("filter-tasks");
    this.filterCategory = document.getElementById("filter-category");

    this.form.addEventListener("submit", (e) => this.addTask(e));
    this.filterSelect.addEventListener("change", () => this.applyFilter());
    this.filterCategory.addEventListener("change", () => this.applyFilter());

    this.loadTasks();
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      this.addTaskToDOM(task.text, task.category, task.completed);
    });
    this.applyFilter(); // Terapkan filter saat memuat
  }

  addTask(e) {
    e.preventDefault();
    const taskText = this.todoInput.value.trim();
    const category = this.taskCategory.value;
    if (taskText === "") return;

    this.addTaskToDOM(taskText, category);
    this.todoInput.value = ""; // Kosongkan input setelah menambah tugas
    this.updateLocalStorage(); // Perbarui localStorage
  }

  addTaskToDOM(taskText, category, completed = false) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.setAttribute("data-category", category);

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    if (completed) {
      taskSpan.classList.add("completed");
    }

    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = completed;
    completeCheckbox.onclick = () => {
      taskSpan.classList.toggle("completed", completeCheckbox.checked);
      this.updateLocalStorage();
      this.applyFilter();
    };

    const removeButton = document.createElement("button");
    removeButton.textContent = "✖";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = () => {
      this.todoList.removeChild(todoItem);
      this.updateLocalStorage();
    };

    todoItem.appendChild(completeCheckbox);
    todoItem.appendChild(taskSpan);
    todoItem.appendChild(removeButton);
    this.todoList.appendChild(todoItem);
  }

  updateLocalStorage() {
    const tasks = [];
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item) => {
      const taskText = item.querySelector("span").textContent;
      const completed = item.querySelector("input[type='checkbox']").checked;
      const category = item.getAttribute("data-category");
      tasks.push({ text: taskText, category: category, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.applyFilter();
  }

  applyFilter() {
    const filterValue = this.filterSelect.value;
    const filterCategoryValue = this.filterCategory.value;
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
      const taskSpan = item.querySelector("span");
      const isCompleted = taskSpan.classList.contains("completed");
      const taskCategory = item.getAttribute("data-category");

      // Filter berdasarkan status
      const statusMatch =
        filterValue === "all" ||
        (filterValue === "completed" && isCompleted) ||
        (filterValue === "incomplete" && !isCompleted);

      // Filter berdasarkan kategori
      const categoryMatch =
        filterCategoryValue === "all" || filterCategoryValue === taskCategory;

      item.style.display = statusMatch && categoryMatch ? "flex" : "none";
    });
  }
}

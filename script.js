document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("new-task");
  const taskCategory = document.getElementById("task-category");
  const todoList = document.getElementById("todo-list");
  const filterSelect = document.getElementById("filter-tasks");
  const filterCategory = document.getElementById("filter-category");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToDOM(task.text, task.category, task.completed);
    });
    applyFilter(); // Terapkan filter saat memuat
  }

  function addTaskToDOM(taskText, category, completed = false) {
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
    completeCheckbox.onclick = function () {
      taskSpan.classList.toggle("completed", completeCheckbox.checked);
      updateLocalStorage();
      applyFilter(); // Terapkan filter setelah status berubah
    };

    const removeButton = document.createElement("button");
    removeButton.textContent = "✖";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = function () {
      todoList.removeChild(todoItem);
      updateLocalStorage();
    };

    todoItem.appendChild(completeCheckbox);
    todoItem.appendChild(taskSpan);
    todoItem.appendChild(removeButton);
    todoList.appendChild(todoItem);
  }

  function updateLocalStorage() {
    const tasks = [];
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item) => {
      const taskText = item.querySelector("span").textContent;
      const completed = item.querySelector("input[type='checkbox']").checked;
      const category = item.getAttribute("data-category");
      tasks.push({ text: taskText, category: category, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    applyFilter(); // Terapkan filter setiap kali data diperbarui
  }

  function applyFilter() {
    const filterValue = filterSelect.value;
    const filterCategoryValue = filterCategory.value;
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
      const taskSpan = item.querySelector("span");
      const isCompleted = taskSpan.classList.contains("completed");
      const taskCategory = item.getAttribute("data-category");

      // Filter berdasarkan status
      let statusMatch =
        filterValue === "all" ||
        (filterValue === "completed" && isCompleted) ||
        (filterValue === "incomplete" && !isCompleted);

      // Filter berdasarkan kategori
      let categoryMatch =
        filterCategoryValue === "all" || filterCategoryValue === taskCategory;

      if (statusMatch && categoryMatch) {
        item.style.display = "flex"; // Tampilkan jika sesuai dengan kedua filter
      } else {
        item.style.display = "none"; // Sembunyikan jika tidak cocok
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    const category = taskCategory.value;
    if (taskText === "") return;
    addTaskToDOM(taskText, category);
    todoInput.value = ""; // Kosongkan input setelah menambah tugas
    updateLocalStorage(); // Perbarui localStorage
  });

  loadTasks();

  // Event listener untuk filter
  filterSelect.addEventListener("change", applyFilter);
  filterCategory.addEventListener("change", applyFilter);
});

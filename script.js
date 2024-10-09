document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("todo-form");
  const taskList = document.getElementById("todo-list");
  const newTaskInput = document.getElementById("new-task");

  const allFilterBtn = document.getElementById("all-filter");
  const completedFilterBtn = document.getElementById("completed-filter");
  const incompleteFilterBtn = document.getElementById("incomplete-filter");
  
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("theme");

  // Set initial theme based on localStorage
  if (savedTheme) {
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    themeIcon.classList.toggle("fa-sun", savedTheme === "dark");
    themeIcon.classList.toggle("fa-moon", savedTheme !== "dark");
  }

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks
  function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `list-group-item ${task.completed ? "completed" : "incomplete"}`;
      li.innerHTML = `
        <span class="status-label">${task.completed ? "Complete" : "Incomplete"}</span>
        <span>${task.name}</span>
        <div>
          <button class="btn btn-success btn-sm complete-btn">${task.completed ? "Undo" : "Complete"}</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
      `;

      // Toggle task completion
      li.querySelector(".complete-btn").addEventListener("click", function () {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(filter);
      });

      // Delete task
      li.querySelector(".delete-btn").addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
      });

      taskList.appendChild(li);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add new task
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskName = newTaskInput.value.trim();
    if (taskName) {
      tasks.push({ name: taskName, completed: false });
      saveTasks();
      renderTasks();
      newTaskInput.value = "";
    }
  });

  // Filter buttons
  allFilterBtn.addEventListener("click", () => renderTasks("all"));
  completedFilterBtn.addEventListener("click", () => renderTasks("completed"));
  incompleteFilterBtn.addEventListener("click", () => renderTasks("incomplete"));

  // Toggle Dark Mode/Light Mode
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeIcon.classList.toggle("fa-sun", isDarkMode);
    themeIcon.classList.toggle("fa-moon", !isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });

  // Initial render
  renderTasks();
});

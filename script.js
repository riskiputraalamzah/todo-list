document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");
    const newTaskInput = document.getElementById("new-task");
    const filterButtons = document.querySelectorAll(".filters button");
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const renderTasks = (filter = "all") => {
      todoList.innerHTML = "";
      let filteredTasks = tasks;
  
      if (filter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
      } else if (filter === "pending") {
        filteredTasks = tasks.filter((task) => !task.completed);
      }
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
  
        // Mark task as complete
        li.querySelector(".complete-btn").addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks(filter);
        });
  
        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks(filter);
        });
  
        todoList.appendChild(li);
      });
    };
  
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Add new task
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = newTaskInput.value.trim();
  
      if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        newTaskInput.value = "";
      }
    });
  
    // Filter tasks
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.id;
        renderTasks(filter);
      });
    });
  
    // Initial render
    renderTasks();
  });
  
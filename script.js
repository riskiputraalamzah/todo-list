document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-list");
  const filterButtons = document.querySelectorAll(".filter-button");

  // Load tasks from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTasks(filter = "all") {
    todoList.innerHTML = ""; // Clear the list
    const filteredTodos = todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "uncompleted") return !todo.completed;
      return true; // Untuk 'all'
    });
    filteredTodos.forEach(addTaskToDOM);
  }

  function addTaskToDOM(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    if (task.completed) listItem.classList.add("completed");

    const date = new Date(task.date);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    const taskContent = document.createElement("div");
    taskContent.innerHTML = `
            <span>${task.text}</span>
            <span>${formattedDate}</span>
        `;

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeButton.addEventListener("click", function () {
      task.completed = !task.completed;
      saveToLocalStorage();
      renderTasks();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.addEventListener("click", function () {
      todos = todos.filter((t) => t !== task);
      saveToLocalStorage();
      renderTasks();
    });

    listItem.appendChild(taskContent);
    listItem.appendChild(completeButton);
    listItem.appendChild(removeButton);
    todoList.appendChild(listItem);
  }

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newTaskInput = document.getElementById("new-task");
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      const newTask = {
        text: taskText,
        completed: false,
        date: new Date(),
      };
      todos.push(newTask);
      saveToLocalStorage();
      renderTasks();
      newTaskInput.value = ""; // Clear input field
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active")); // Hapus kelas aktif dari semua tombol
      this.classList.add("active"); // Tambahkan kelas aktif ke tombol yang diklik
      renderTasks(this.dataset.filter); // Render tugas berdasarkan filter yang dipilih
    });
  });

  // Initial render of tasks
  renderTasks();
});

function mOver(obj) {
  obj.innerHTML = "Adding Task...";
}

function mOut(obj) {
  obj.innerHTML = "Add Task";
}

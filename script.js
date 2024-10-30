export class Todo {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTask(task) {
    if (this.todos.length < 10) { // Batasi jumlah tugas maksimal 10
      this.todos.push(task);
      this.saveToLocalStorage();
      showFloatingMessage("Tugas ditambahkan!", 3000); // Notifikasi saat tugas ditambahkan
    } else {
      alert("Maximum number of tasks reached (10)."); // Notifikasi jika sudah mencapai batas
    }
  }

  removeTask(task) {
    this.todos = this.todos.filter((t) => t !== task);
    this.saveToLocalStorage();
    showFloatingMessage("Tugas dihapus!", 3000); // Notifikasi saat tugas dihapus
  }

  toggleTaskCompletion(task) {
    task.completed = !task.completed;
    this.saveToLocalStorage();
  }

  getTasks() {
    return this.todos;
  }
}

export class UI {
  constructor(todo) {
    this.todo = todo;
    this.todoList = document.getElementById("todo-list");
    this.todoForm = document.getElementById("todo-form");
    this.filterButtons = document.querySelectorAll(".filter-button");
    this.initEventListeners();
  }

  renderTasks(filter = "all") {
    this.todoList.innerHTML = ""; // Clear the list
    const filteredTodos = this.todo.getTasks().filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "uncompleted") return !todo.completed;
      return true; // Untuk 'all'
    });
    filteredTodos.forEach(this.addTaskToDOM.bind(this));
  }

  addTaskToDOM(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    if (task.completed) listItem.classList.add("completed");

    const date = new Date(task.date);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    const taskContent = document.createElement("div");
    taskContent.innerHTML = `
      <span>${task.text}</span>
      <span>${formattedDate}</span>
    `;

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeButton.addEventListener("click", () => {
      this.todo.toggleTaskCompletion(task);
      this.renderTasks();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.addEventListener("click", () => {
      this.todo.removeTask(task);
      this.renderTasks();
    });

    listItem.appendChild(taskContent);
    listItem.appendChild(completeButton);
    listItem.appendChild(removeButton);
    this.todoList.appendChild(listItem);
  }

  initEventListeners() {
    this.todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTaskInput = document.getElementById("new-task");
      const taskText = newTaskInput.value.trim();
      if (taskText !== "") {
        const newTask = {
          text: taskText,
          completed: false,
          date: new Date(),
        };
        this.todo.addTask(newTask);
        this.renderTasks();
        newTaskInput.value = ""; // Clear input field
      }
    });

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.filterButtons.forEach((btn) => btn.classList.remove("active")); // Hapus kelas aktif dari semua tombol
        button.classList.add("active"); // Tambahkan kelas aktif ke tombol yang diklik
        this.renderTasks(button.dataset.filter); // Render tugas berdasarkan filter yang dipilih
      });
    });
  }
}

// Fungsi untuk menampilkan pesan melayang
export function showFloatingMessage(message, duration, nextMessage) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "floating-message";
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  // Hapus pesan setelah durasi yang ditentukan
  setTimeout(() => {
      messageDiv.remove();

      // Jika ada pesan berikutnya, tampilkan
      if (nextMessage) {
          setTimeout(() => {
              showFloatingMessage(nextMessage.message, nextMessage.duration);
          }, 1000); // Tambahkan delay sebelum menampilkan pesan berikutnya
      }
  }, duration); // Durasi untuk pesan ini
}

// Pesan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  showFloatingMessage("Selamat datang di aplikasi To-Do List!", 10000, {
      message: "Tambahkan kegiatan atau tugas anda!", 
      duration: 10000
  });
});

// Fungsi untuk efek hover pada tombol
export function mOver(obj) {
  obj.innerHTML = "Adding Task...";
}

export function mOut(obj) {
  obj.innerHTML = "Add Task";
}

// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", () => {
  const todo = new Todo();
  const ui = new UI(todo);
  ui.renderTasks(); // Render tugas awal
});

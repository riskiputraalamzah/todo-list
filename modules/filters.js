// modules/filters.js
import { tasks, toggleTaskCompletion, deleteTask } from './tasks.js';
import { taskList } from './domElements.js';

export function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // Bersihkan daftar tugas sebelum dirender ulang

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  // Render setiap tugas dan tambahkan event listener
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

    // Pasang event listener untuk tombol Complete/Incomplete
    li.querySelector(".complete-btn").addEventListener("click", () => {
      toggleTaskCompletion(index);
      renderTasks(filter); // Render ulang setelah perubahan status
    });

    // Pasang event listener untuk tombol Delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTask(index);
      renderTasks(filter); // Render ulang setelah tugas dihapus
    });

    taskList.appendChild(li); // Tambahkan elemen tugas ke dalam daftar
  });
}

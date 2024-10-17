// modules/eventListeners.js
import { tasks, saveTasks } from './tasks.js';
import { renderTasks } from './filters.js';
import { 
  taskForm, newTaskInput, allFilterBtn, completedFilterBtn, incompleteFilterBtn, themeToggleBtn 
} from './domElements.js';
import { updateThemeIcon } from './theme.js';

// Event Listener: Tambah Tugas Baru
export function addTaskListener() {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value.trim();
    if (taskName) {
      tasks.push({ name: taskName, completed: false }); // Tambah tugas baru
      saveTasks(); // Simpan ke localStorage
      renderTasks(); // Render ulang daftar tugas
      newTaskInput.value = ""; // Kosongkan input
    }
  });
}

// Event Listener: Toggle Tema
export function themeToggleListener() {
  themeToggleBtn.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    updateThemeIcon(isDarkMode); // Perbarui ikon tema
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Simpan tema
  });
}

// Event Listener: Filter Tugas
export function filterListeners() {
  allFilterBtn.addEventListener("click", () => renderTasks("all"));
  completedFilterBtn.addEventListener("click", () => renderTasks("completed"));
  incompleteFilterBtn.addEventListener("click", () => renderTasks("incomplete"));
}

// modules/tasks.js
export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Simpan tugas ke localStorage
export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ubah status tugas antara Complete dan Incomplete
export function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(); // Simpan perubahan ke localStorage
}

// Hapus tugas dari daftar
export function deleteTask(index) {
  tasks.splice(index, 1); // Hapus tugas berdasarkan indeks
  saveTasks(); // Simpan perubahan ke localStorage
}

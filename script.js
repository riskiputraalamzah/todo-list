// Menangkap elemen form dan daftar to-do dari DOM
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');

// Tombol filter
const allTasksBtn = document.getElementById('all-tasks');
const activeTasksBtn = document.getElementById('active-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');

// Muat tugas dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Tambahkan event listener pada form untuk menambahkan tugas baru
todoForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah reload halaman

  const taskText = newTaskInput.value; // Ambil nilai dari input

  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);
    newTaskInput.value = ''; // Reset input setelah menambahkan tugas
  }
});

// Fungsi untuk menambahkan tugas ke dalam DOM
function addTaskToDOM(taskText, isCompleted = false) {
  const newTask = document.createElement('li');
  newTask.classList.add('todo-item'); // Tambahkan kelas untuk styling

  // Membuat elemen teks tugas dan tambahkan ke elemen list
  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;

  if (isCompleted) {
    taskContent.classList.add('completed');
  }

  // Membuat tombol 'Hapus'
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('remove-btn'); // Tambahkan kelas untuk styling

  // Event listener untuk menandai tugas selesai
  taskContent.addEventListener('click', function () {
    taskContent.classList.toggle('completed');
    updateTaskStatusInLocalStorage(taskText);
  });

  // Event listener untuk tombol 'Hapus'
  deleteButton.addEventListener('click', function () {
    newTask.remove(); // Hapus tugas ketika tombol diklik
    removeTaskFromLocalStorage(taskText); // Hapus dari localStorage
  });

  // Susun elemen-elemen ke dalam elemen tugas
  newTask.appendChild(taskContent);  // Teks tugas di sebelah kiri
  newTask.appendChild(deleteButton); // Tombol hapus di sebelah kanan

  // Tambahkan tugas baru ke dalam daftar
  todoList.appendChild(newTask);
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk memuat tugas dari localStorage
function loadTasksFromLocalStorage() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task) {
    addTaskToDOM(task.text, task.completed);
  });
}

// Fungsi untuk mendapatkan tugas dari localStorage
function getTasksFromLocalStorage() {
  let tasks = localStorage.getItem('tasks');
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}

// Fungsi untuk memperbarui status tugas di localStorage
function updateTaskStatusInLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task) {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk menghapus tugas dari localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(function (task) {
    return task.text !== taskText;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk memfilter tugas yang akan ditampilkan
function filterTasks(filter) {
  const tasks = document.querySelectorAll('.todo-item');

  tasks.forEach(function (task) {
    const taskContent = task.querySelector('span');

    switch (filter) {
      case 'all':
        task.style.display = 'flex'; // Tampilkan semua tugas
        break;
      case 'active':
        if (taskContent.classList.contains('completed')) {
          task.style.display = 'none'; // Sembunyikan tugas selesai
        } else {
          task.style.display = 'flex'; // Tampilkan tugas belum selesai
        }
        break;
      case 'completed':
        if (taskContent.classList.contains('completed')) {
          task.style.display = 'flex'; // Tampilkan tugas selesai
        } else {
          task.style.display = 'none'; // Sembunyikan tugas belum selesai
        }
        break;
    }
  });
}

// Event listeners untuk filter tombol
allTasksBtn.addEventListener('click', function () {
  filterTasks('all');
});

activeTasksBtn.addEventListener('click', function () {
  filterTasks('active');
});

completedTasksBtn.addEventListener('click', function () {
  filterTasks('completed');
});

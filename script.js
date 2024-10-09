// Menangkap elemen dari DOM
const todoForm = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');
const filterAll = document.getElementById('filter-all');
const filterCompleted = document.getElementById('filter-completed');
const filterPending = document.getElementById('filter-pending');

// Mendapatkan tugas dari localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Menampilkan semua tugas
function displayTodos(todosToDisplay) {
  todoList.innerHTML = ''; // Menghapus daftar yang ada
  todosToDisplay.forEach(todo => {
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = todo.text;
    newTaskItem.classList.toggle('completed', todo.completed);

    // Tombol untuk menandai sebagai selesai
    const completeButton = document.createElement('button');
    completeButton.textContent = '✓';
    completeButton.classList.add('complete-btn');

    // Tombol untuk menghapus tugas
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    // Menangani event click pada tombol selesai
    completeButton.addEventListener('click', function () {
      todo.completed = !todo.completed; // Toggle status selesai
      updateLocalStorage();
      displayTodos(todos); // Perbarui tampilan
    });

    // Menangani event click pada tombol delete
    deleteButton.addEventListener('click', function () {
      todos = todos.filter(t => t !== todo);
      updateLocalStorage();
      displayTodos(todos);
    });

    // Menambahkan tombol ke elemen tugas
    newTaskItem.appendChild(completeButton);
    newTaskItem.appendChild(deleteButton);
    
    // Menambahkan elemen tugas ke dalam daftar
    todoList.appendChild(newTaskItem);
  });
}

// Memperbarui localStorage
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Menangani event submit pada form
todoForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah form dari refresh halaman

  // Mendapatkan nilai dari input
  const newTaskText = newTaskInput.value;

  // Menambahkan tugas baru ke array
  const newTask = { text: newTaskText, completed: false };
  todos.push(newTask);

  // Memperbarui localStorage dan tampilan
  updateLocalStorage();
  displayTodos(todos);

  // Mengosongkan input
  newTaskInput.value = '';
});

// Filter untuk melihat tugas berdasarkan status
filterAll.addEventListener('click', function () {
  displayTodos(todos); // Tampilkan semua tugas
});

filterCompleted.addEventListener('click', function () {
  const completedTodos = todos.filter(todo => todo.completed);
  displayTodos(completedTodos); // Tampilkan tugas selesai
});

filterPending.addEventListener('click', function () {
  const pendingTodos = todos.filter(todo => !todo.completed);
  displayTodos(pendingTodos); // Tampilkan tugas yang belum selesai
});

// Menampilkan tugas saat halaman dimuat
displayTodos(todos);

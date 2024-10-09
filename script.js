const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    addTask(newTask);
    Swal.fire({
      title: 'Task Added!',
      text: `You have added a new task: "${newTask}"`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    newTaskInput.value = '';
  }
});

function addTask(task) {
  const taskElement = document.createElement('li');

  // Buat elemen teks tugas
  const taskText = document.createElement('span');
  taskText.textContent = task;

  // Event untuk menandai tugas selesai dengan mengklik teks
  taskText.addEventListener('click', () => {
    if (!taskText.classList.contains('done')) {
      Swal.fire({
        title: 'Mark as Done?',
        text: "Do you want to mark this task as done?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, mark it!'
      }).then((result) => {
        if (result.isConfirmed) {
          taskText.classList.add('done');
          Swal.fire(
            'Done!',
            'The task has been marked as done.',
            'success'
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Mark as Undone?',
        text: "Do you want to undo the mark as done?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, undo it!'
      }).then((result) => {
        if (result.isConfirmed) {
          taskText.classList.remove('done');
          Swal.fire(
            'Undone!',
            'The task has been marked as undone.',
            'success'
          );
        }
      });
    }
  });

  // Tombol Hapus
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.classList.add('delete-btn');

  // SweetAlert untuk konfirmasi penghapusan
  deleteButton.addEventListener('click', () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        taskElement.remove();
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      }
    });
  });

  // Tambahkan teks dan tombol ke dalam item tugas
  taskElement.appendChild(taskText);
  taskElement.appendChild(deleteButton);

  // Masukkan elemen ke dalam daftar
  todoList.appendChild(taskElement);
}

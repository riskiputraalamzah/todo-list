document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah pengiriman formulir

    const taskInput = document.getElementById('new-task'); // Mengambil nilai dari input
    const taskText = taskInput.value;

    if (taskText) {
        addTask(taskText); // Menambahkan tugas baru
        taskInput.value = ''; // Mengosongkan input setelah menambahkan
    }
});

// Fungsi untuk menambahkan tugas baru ke dalam daftar
function addTask(task) {
    const todoList = document.getElementById('todo-list'); // Mengambil elemen daftar

    const li = document.createElement('li'); // Membuat elemen list baru
    li.textContent = task; // Mengisi list dengan teks tugas

    // Membuat tombol untuk menandai tugas sebagai selesai
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.onclick = function() {
        li.classList.toggle('completed'); // Menandai tugas sebagai selesai
        doneBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Done'; // Mengubah teks tombol
    };

    // Membuat tombol hapus
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'; // Teks tombol
    deleteBtn.onclick = function() {
        todoList.removeChild(li); // Menghapus elemen li dari daftar saat tombol diklik
    };

    // Menambahkan tombol ke dalam elemen li
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li); // Menambahkan elemen li ke dalam daftar
}

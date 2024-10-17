export function addTask(task) {
    const todoList = document.getElementById('todo-list');
    const taskElement = document.createElement('li');
  
    // Buat elemen teks tugas
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.style.cursor = 'pointer';
  
    // Event untuk menandai tugas selesai
    taskText.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!taskText.classList.contains('done')) {
        Swal.fire({
          title: 'Tandai sebagai Selesai?',
          text: "Apakah kamu ingin menandai tugas ini sebagai selesai?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, tandai!'
        }).then((result) => {
          if (result.isConfirmed) {
            taskText.classList.add('done');
            Swal.fire(
              'Selesai!',
              'Tugas telah ditandai sebagai selesai.',
              'success'
            );
          }
        });
      } else {
        Swal.fire({
          title: 'Batalkan Tandai Selesai?',
          text: "Apakah kamu ingin membatalkan tanda selesai pada tugas ini?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, batalkan!'
        }).then((result) => {
          if (result.isConfirmed) {
            taskText.classList.remove('done');
            Swal.fire(
              'Dibatalkan!',
              'Tugas telah dibatalkan tandanya sebagai selesai.',
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
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      Swal.fire({
        title: 'Apakah kamu yakin?',
        text: "Apakah kamu ingin menghapus tugas ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
      }).then((result) => {
        if (result.isConfirmed) {
          taskElement.remove();
          Swal.fire(
            'Terhapus!',
            'Tugas telah dihapus.',
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
  
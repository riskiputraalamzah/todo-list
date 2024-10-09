// Ambil elemen DOM
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("new-task");
const todoList = document.getElementById("todo-list");

// Fungsi untuk menambah tugas
function addTask(event) {
  event.preventDefault(); // Mencegah reload halaman setelah submit form

  const taskText = taskInput.value.trim(); // Mengambil nilai input dan menghilangkan spasi berlebih

  if (taskText === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tugas tidak boleh kosong!',
      scrollbarPadding: false // Mencegah padding tambahan pada scrollbar
    });
    return;
  }

  // Buat elemen <li> baru
  const li = document.createElement("li");

  // Buat elemen div untuk menampung teks tugas
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-text");
  taskDiv.textContent = taskText;

  // Buat tombol hapus
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.classList.add("delete-btn");

  // Tambahkan aksi hapus pada tombol dengan konfirmasi SweetAlert2
  deleteBtn.addEventListener("click", function () {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Tugas ini akan dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      scrollbarPadding: false // Mencegah padding tambahan pada scrollbar
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          todoList.removeChild(li); // Hapus tugas jika dikonfirmasi
          Swal.fire(
            'Dihapus!',
            'Tugas telah dihapus.',
            'success',
            {
              scrollbarPadding: false // Mencegah padding tambahan pada scrollbar
            }
          );
        } catch (error) {
          console.error("Error saat menghapus tugas:", error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Terjadi kesalahan saat menghapus tugas.',
            scrollbarPadding: false
          });
        }
      }
    });
  });

  // Tambahkan aksi "tugas selesai" pada klik teks tugas
  taskDiv.addEventListener("click", function () {
    taskDiv.classList.toggle("completed"); // Toggle kelas "completed"
  });

  // Gabungkan taskDiv dan deleteBtn ke dalam <li>
  li.appendChild(taskDiv);   // Tambahkan teks tugas ke dalam <li>
  li.appendChild(deleteBtn); // Tambahkan tombol hapus ke dalam <li>

  // Tambahkan <li> ke dalam daftar <ul>
  try {
    todoList.appendChild(li);
  } catch (error) {
    console.error("Error saat menambahkan tugas:", error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Terjadi kesalahan saat menambahkan tugas.',
      scrollbarPadding: false
    });
  }

  // Kosongkan input setelah tugas ditambahkan
  taskInput.value = "";

  // Tampilkan notifikasi sukses dengan SweetAlert2
  Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: 'Tugas berhasil ditambahkan!',
    showConfirmButton: false,
    timer: 1500,
    scrollbarPadding: false // Mencegah padding tambahan pada scrollbar
  });
}

// Event listener untuk form submit
form.addEventListener("submit", addTask);

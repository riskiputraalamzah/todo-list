import { initializeTheme } from './modules/theme.js';
import { renderTasks } from './modules/filters.js';
import { 
  addTaskListener, themeToggleListener, filterListeners 
} from './modules/eventListeners.js';

// Inisialisasi tema dan render tugas saat halaman dimuat
initializeTheme();
renderTasks(); // Render daftar tugas awal

// Pasang semua event listener
addTaskListener();
themeToggleListener();
filterListeners();

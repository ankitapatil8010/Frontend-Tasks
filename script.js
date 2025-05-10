const form = document.getElementById('taskForm');
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const incompleteList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completedTasks');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const filterSelect = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let draggedId = null;

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

//change theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});


// Adding task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  if (!title) return;

  const task = {
    id: Date.now(),
    title,
    desc,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  showToast("Task Created");

  form.reset();
});

filterSelect.addEventListener('change', renderTasks);

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  incompleteList.innerHTML = '';
  completedList.innerHTML = '';

  const filter = filterSelect.value;

  tasks.forEach(task => {
    if (
      (filter === 'completed' && !task.completed) ||
      (filter === 'pending' && task.completed)
    ) return;

    const li = document.createElement('li');
    li.className = 'task';
    li.draggable = true;
    li.dataset.id = task.id;
    li.innerHTML = `
      <strong>${task.title}</strong><br>
      <small>${task.desc || ''}</small>
      <button class="edit"><i class="fa-solid fa-pencil fa-xs" style="color: #FFD43B;"></i></button>
      <button class="delete"><i class="fa-solid fa-trash fa-xs" style="color: #a83a0b;"></i></button>
    `;

    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragend', dragEnd);

    li.querySelector('.edit').addEventListener('click', () => editTask(task.id));
    li.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      incompleteList.appendChild(li);
    }
  });
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit Task Title:", task.title);
  const newDesc = prompt("Edit Description:", task.desc);


  if (newTitle !== null) task.title = newTitle.trim();
  if (newDesc !== null) task.desc = newDesc.trim();

  saveTasks();
  renderTasks();
  showToast("Task Updated");
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  showToast("Task Deleted");
}

// Drag & Drop

function dragStart(e) {
  draggedId = e.target.dataset.id;
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const targetList = e.target.closest('ul');
  const isCompleted = targetList.id === 'completedTasks';

  tasks = tasks.map(task => {
    if (task.id == draggedId) {
      task.completed = isCompleted;
      showToast(isCompleted ? "Task Moved to Completed" : "Task Moved to Incomplete");
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

// Notification
function showToast(msg) {
  toast.innerText = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}

renderTasks();

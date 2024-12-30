window.onload = () => {
  const form = document.getElementById("addForm");
  const items = document.getElementById("items");

  loadTasks();

  form.addEventListener("submit", (e) => addItem(e));
  items.addEventListener("click", handleItemActions);
};

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => createTaskElement(task));
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const span = document.createElement("span");
  span.textContent = task.text;

  if (task.completed) {
    span.classList.add("completed");
  }
  li.appendChild(span);

  const completeButton = document.createElement("button");
  completeButton.className = "btn btn-success btn-sm mr-2 complete";
  completeButton.textContent = task.completed ? "Undo" : "Complete";
  li.appendChild(completeButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm delete";
  deleteButton.textContent = "Delete";
  li.appendChild(deleteButton);

  const items = document.getElementById("items");
  items.appendChild(li);
}

function addItem(e) {
  e.preventDefault();

  const input = document.getElementById("addItem");
  const text = input.value.trim();

  if (text === "") {
    alert("Task cannot be empty!");
    return false;
  }

  const task = {
    text,
    completed: false,
  };

  saveTaskToLocalStorage(task);
  createTaskElement(task);

  input.value = "";

  showMessage("Task added successfully.");
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleItemActions(e) {
  const items = document.getElementById("items");

  if (e.target.classList.contains("delete")) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;
    items.removeChild(li);

    removeTaskFromLocalStorage(taskText);
    showMessage("Task deleted successfully.");
  }

  if (e.target.classList.contains("complete")) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;

    toggleTaskCompletionInLocalStorage(taskText);
    li.firstChild.classList.toggle("completed");
    e.target.textContent =
      e.target.textContent === "Complete" ? "Undo" : "Complete";
  }
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

function toggleTaskCompletionInLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showMessage(message) {
  const lblsuccess = document.getElementById("lblsuccess");
  lblsuccess.textContent = message;
  lblsuccess.style.display = "block";

  setTimeout(() => {
    lblsuccess.style.display = "none";
  }, 3000);
}

const tasks = [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const task = taskInput.value.trim();
  if (!task) {
    alert("Please enter a task.");
    return;
  }
  if (tasks.includes(task)) {
    alert("This task is already on your to-do list.");
    return;
  }

  tasks.push(task);
  addTaskToList(task);
  taskInput.value = "";
}

function addTaskToList(task) {
  const newTask = document.createElement("li");
  newTask.textContent = task;
  newTask.onclick = () => {
    newTask.classList.toggle("completed");
  };
  newTask.draggable = true;
  newTask.addEventListener("dragstart", dragStart);
  newTask.addEventListener("dragover", dragOver);
  newTask.addEventListener("drop", drop);
  taskList.appendChild(newTask);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.innerHTML);
  e.dataTransfer.effectAllowed = "move";
  e.target.classList.add("dragging");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const source = document.querySelector(`li[draggable][class="dragging"]`);
  const target = e.target.closest("li[draggable]");
  if (source && target) {
    const sourceIndex = Array.from(source.parentNode.children).indexOf(source);
    const targetIndex = Array.from(target.parentNode.children).indexOf(target);
    target.parentNode.insertBefore(source, targetIndex > sourceIndex ? target.nextSibling : target);
    tasks.splice(targetIndex, 0, tasks.splice(sourceIndex, 1)[0]);
  }
  source.classList.remove("dragging");
}

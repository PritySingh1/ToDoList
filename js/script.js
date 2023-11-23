const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".to-do-lists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

let toDoItems = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

function allTasks() {
  let tasks = document.querySelectorAll(".pending");
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
  if (toDoItems.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();
  if (e.key === "Enter" && inputVal.length > 0) {
    toDoItems.push(inputVal);
    localStorage.setItem("items", JSON.stringify(toDoItems));
    inputField.value = "";
    displayToDoItems();
    allTasks();
  }
});

function displayToDoItems() {
  let items = "";
  for (let i = 0; i < toDoItems.length; i++) {
    items += `<li class="list pending" onClick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${toDoItems[i]}</span>
          <i class="uil uil-trash" onClick="deleteTask(this, ${i})"></i>
        </li>`;
  }
  todoLists.innerHTML = items;
}

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = !checkbox.checked;
  e.classList.toggle("pending");
  allTasks();
}

function deleteTask(e, index) {
  toDoItems.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(toDoItems));
  displayToDoItems();
  allTasks();
}

clearButton.addEventListener("click", () => {
  toDoItems = [];
  localStorage.setItem("items", JSON.stringify(toDoItems));
  displayToDoItems();
  allTasks();
});

window.onload = function () {
  displayToDoItems();
  allTasks();
};

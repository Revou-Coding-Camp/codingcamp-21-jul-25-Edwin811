document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const todoList = document.getElementById("todo-list");
  const filterInput = document.getElementById("filter-input");

  let todos = [];

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodos(todos);
  }

  function updateStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = dateInput.value;
    if (task === "" || date === "") {
      alert("Please fill in both fields.");
      return;
    }
    const newTodo = { task, date, id: Date.now() };
    todos.push(newTodo);
    updateStorage();
    renderTodos(todos);
    form.reset();
  });

  function renderTodos(list) {
    todoList.innerHTML = "";
    list.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${todo.task}</strong>
          <div class="date">${todo.date}</div>
        </div>
        <button data-id="${todo.id}">Delete</button>
      `;
      li.style.animation = "fadeIn 0.3s ease";
      todoList.appendChild(li);
    });
  }

  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.getAttribute("data-id");
      todos = todos.filter((todo) => todo.id !== Number(id));
      updateStorage();
      renderTodos(todos);
    }
  });

  filterInput.addEventListener("input", () => {
    const keyword = filterInput.value.toLowerCase();
    const filtered = todos.filter((todo) =>
      todo.task.toLowerCase().includes(keyword)
    );
    renderTodos(filtered);
  });

  const clearAllBtn = document.getElementById("clear-all");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all tasks?")) {
        todos = [];
        updateStorage();
        renderTodos(todos);
      }
    });
  }
});

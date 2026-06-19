const API_URL = "/api";

async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task.title;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  fetchTasks();
}

fetchTasks();

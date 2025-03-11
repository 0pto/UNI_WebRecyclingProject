const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    title: "Example task",
    date: "2025-08-27",
  },
];

renderTodoList();
function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const title = todoObject.title;
    //const date = todoObject.date;
    const { title, date } = todoObject;
    let html = `
        <div>${title}</div>
         <div>${date}</div>
         <button onclick=" 
         todoList.splice(${i},1);
         renderTodoList();
  
         saveToStorage();
         " class="delete-button">Delete</button>
         
         `;
    todoListHTML += html;
  }

  //console.log(todoListHTML);

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
  console.log(todoList);
}

function addTodo() {
  const inputElement = document.querySelector(".js-title-input");
  const title = inputElement.value;

  const dateElement = document.querySelector(".js-date-input");
  const date = dateElement.value;

  todoList.push({
    //title: title,
    //date: date,
    title,
    date,
  });
  //onsole.log(todoList);
  inputElement.value = "";
  renderTodoList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

/**
 * [
 *    {
 *      id: <int>
 *      task: <string>
 *      timestamp: <string>
 *      isCompleted: <boolean>
 *    }
 * ]
 */
const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function generateId() {
  return +new Date();
}

function generateTodoObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
}


/**
 * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
 *
 * @returns boolean
 */
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
function saveData() {
  if (isStorageExist()) {
    const parsed /* string */ = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see todos}
 */
function loadDataFromStorage() {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeTodo(todoObject) {
  const { id, title, author, year, isCompleted } = todoObject;

  const textTitle = document.createElement('h2');
  textTitle.innerText = title;

  const textPenulis = document.createElement('p');
  textPenulis.innerText = author;

  const textTahun = document.createElement('p');
  textTahun.innerText = year;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textPenulis, textTahun);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${id}`);

  const searchInput = document.getElementById('searchBookTitle').value.toLowerCase();
  const isMatch = title.toLowerCase().includes(searchInput);

  if (!isMatch) {
    container.style.display = 'none';
  } else {
    container.style.display = 'block'; 
  }

  if (isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(id);
    });

    container.append(checkButton, trashButton);
  }

  return container;
}



// function addTodo() {
//   const textJudul = document.getElementById('judul').value;
//   const textPenulis = document.getElementById('penulis').value;
//   const textTahun = document.getElementById('tahun').value;


//   const generatedID = generateId();
//   const todoObject = generateTodoObject(generatedID, textJudul, textPenulis, textTahun, false);
//   todos.push(todoObject);

//   document.dispatchEvent(new Event(RENDER_EVENT));
//   saveData();
// }

function addTodo() {
  const textJudul = document.getElementById('title').value;
  const textPenulis = document.getElementById('author').value;
  const textTahun = parseInt(document.getElementById('year').value, 10);
  const isCompleteCheckbox = document.getElementById('inputBookIsComplete');

  const generatedID = generateId();
  const isCompleted = isCompleteCheckbox.checked;

  const todoObject = generateTodoObject(generatedID, textJudul, textPenulis, textTahun, isCompleted);
  
  if (isCompleted) {
    // Jika checkbox "Selesai dibaca" dicentang, langsung masukkan ke dalam container "sudah dibaca"
    todos.push(todoObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
  } else {
    // Jika checkbox tidak dicentang, hanya tampilkan jika sesuai kriteria pencarian
    const searchInput = document.getElementById('searchBookTitle').value.toLowerCase();
    if (textJudul.toLowerCase().includes(searchInput)) {
      todos.push(todoObject);
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  }

  saveData();
}



function addTaskToCompleted(todoId /* HTMLELement */) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(todoId /* HTMLELement */) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(todoId /* HTMLELement */) {

  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener('DOMContentLoaded', function () {

  const submitForm /* HTMLFormElement */ = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data berhasil di simpan.');
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById('todos');
  const listCompleted = document.getElementById('completed-todos');

  // clearing list item
  uncompletedTODOList.innerHTML = '';
  listCompleted.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (todoItem.isCompleted) {
      listCompleted.append(todoElement);
    } else {
      uncompletedTODOList.append(todoElement);
    }
  }
})

function searchBooksByTitle(title) {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (Array.isArray(data) && data.length > 0) {
    const searchResults = data.filter(book =>
      book &&
      book.title &&
      typeof book.title === 'string' &&
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    return searchResults;
  }

  return [];
}

document.getElementById('searchBook').addEventListener('submit', function(event){
  event.preventDefault();
  const searchInput = document.getElementById('searchBookTitle').value.toLowerCase();
  const searchResults = searchBooksByTitle(searchInput);

  renderTodos(searchResults);
});

function renderTodos(todosToRender) {
  const uncompletedTODOList = document.getElementById('todos');
  const listCompleted = document.getElementById('completed-todos');

  // Clearing list items
  uncompletedTODOList.innerHTML = '';
  listCompleted.innerHTML = '';

  for (const todoItem of todosToRender) {
    const todoElement = makeTodo(todoItem);
    if (todoItem.isCompleted) {
      listCompleted.append(todoElement);
    } else {
      uncompletedTODOList.append(todoElement);
    }
  }
}

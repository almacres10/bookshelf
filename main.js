let bookData = [];
const storageKey = 'STORAGE_KEY';
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';

function generateId() {
    return +new Date();
  }

  function generateBookObject(id, judul, penulis, tahun, isComplete) {
    return {
      id,
      judul,
      penulis,
      tahun,
      isComplete
    }
  }  

  function findBook(bookId) {
    for (const bookItem of bookData) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function findBookIndex(bookId) {
    for (const index in bookData) {
      if (bookData[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }


  function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

  function saveData() {
    if (isStorageExist()) {
      const parsed /* string */ = JSON.stringify(todos);
      localStorage.setItem(storageKey, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
  
    if (data !== null) {
      for (const book of data) {
        bookData.push(book);
      }
    }
  
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  

// function getBookList() {
//     if (checkForStorage()) {
//         return JSON.parse(localStorage.getItem(storageKey) || [] );
//     } else {
//         return [];
//     }
// }

// function selesaiFungsi(bookId) {

//     const todoTarget = findBook(bookId);
//     if (todoTarget == null) return;
  
//     todoTarget.isComplete = true;
//     document.dispatchEvent(new Event(RENDER_EVENT));
    
//   }


// submitAction.addEventListener('submit', function(event){
//     event.preventDefault();
//     const idBuku = + new Date();
//     const inputJudul = document.getElementById('inputBookTitle').value;
//     const inputPenulis = document.getElementById('inputBookAuthor').value;
//     const inputTahun = document.getElementById('inputBookYear').value;
//     const isComplete = document.getElementById('inputBookIsComplete').checked;
//     const newBookData = {
//         id : idBuku,
//         judul : inputJudul,
//         penulis : inputPenulis,
//         tahun : inputTahun,
//         isComplete : isComplete,
//     }

//     if (isComplete === true){
//         putBookList(newBookData);
//         renderBookListComplete();
//     }else{
//         putBookList(newBookData);
//         renderBookListIncomplete();
//     }
// });

// function putBookList(data) {
//     if (checkForStorage()){
//         if (localStorage.getItem(storageKey) !== null) {
//         bookData = JSON.parse(localStorage.getItem(storageKey));
//     }
//     bookData.unshift(data);
//     localStorage.setItem(storageKey, JSON.stringify(bookData));
// }
// }

function makeBook(bookObject) {
    const {id, judul, penulis, tahun, isComplete} = bookObject;
    let article = document.createElement('article');
    article.className = 'book_item';
    article.innerHTML = '<h3>' + id + '</h3><p>' + '<h3>' + judul + '</h3><p>' + penulis + '<p>' + tahun + '<p>';

    let actionDiv = document.createElement('div');
    actionDiv.className = 'action';

    let selesaiButton = document.createElement('button');
    selesaiButton.className = 'green';
    selesaiButton.innerHTML = "Selesai Dibaca";

    let hapusButton = document.createElement('button');
    hapusButton.className = 'red';
    hapusButton.innerHTML = "Hapus";

    actionDiv.appendChild(selesaiButton);
    actionDiv.appendChild(hapusButton);
    article.appendChild(actionDiv);  

    const bookListIncomplete = document.getElementById('incompleteBookshelfList');
    const bookListComplete = document.getElementById('completeBookshelfList');

    if (isComplete = false) {
        bookListIncomplete.appendChild(article);
        return bookListIncomplete;
    } else {
        bookListComplete.appendChild(article);
        return bookListComplete;
    }
}

function addBook() {
    newBook = getBookList();
    const generateId = generateId();
    const bookObject = generateBookObject(generateId, bookData.judul, bookData.penulis, bookData.tahun, bookData.isComplete);
    bookData.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToCompleted(bookId /* HTMLELement */) {
    const bookTarget = findBook(bookId);
  
    if (bookTarget == null) return;
  
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }


window.addEventListener('load', function() {
    if(checkForStorage){
        if(localStorage.getItem(storageKey) !== null){
            renderBookListComplete();
            renderBookListIncomplete();
        }
    } else{
            alert('Browser tidak didukung!');
        }
});


document.addEventListener(RENDER_EVENT, function () {
    const bookList2 = document.getElementById('completeBookshelfList');
    const bookList = document.getElementById('incompleteBookshelfList');

    // clearing list item
    bookList2.innerHTML = '';
    bookList.innerHTML = '';
  
    for (const bookItem of bookData) {
      const bookElement = getBookList();
      if (bookItem.isCompleted) {
        bookList2.append(bookElement);
      } else {
        bookList.append(bookElement);
      }
    }
  })





















//   function renderBookListIncomplete(){
//     const bookData = getBookList();
//     const bookList = document.getElementById('incompleteBookshelfList');
//     bookList.innerHTML = '';
//     for(let book of bookData) {
//         if (book.isComplete === false) {
//             let row = document.createElement('article');
//             row.className = 'book_item'
//             row.innerHTML = '<h3>' + book.judul + '</h3><p>' + book.penulis + '<p>' + book.tahun + '<p>';
//             let actionDiv = document.createElement('div');
//             actionDiv.className = 'action';
//             let selesaiButton = document.createElement('button');
//             selesaiButton.className = 'green';
//             selesaiButton.innerHTML = "Selesai Dibaca";
//             let hapusButton = document.createElement('button');
//             hapusButton.className = 'red';
//             hapusButton.innerHTML = "Hapus";
//             actionDiv.appendChild(selesaiButton);
//             actionDiv.appendChild(hapusButton);   
            
//             selesaiButton.addEventListener('click', function () {
//                 selesaiFungsi(book.id);
//                 console.log('klik berhasil');
//                 console.log(book.id);
//             });


//             row.appendChild(actionDiv);  
//             bookList.appendChild(row);
//         }
//     }
// }

// function renderBookListComplete(){
//     const bookData = getBookList();
//     const bookList2 = document.getElementById('completeBookshelfList');
//     bookList2.innerHTML = '';
//     for(let book of bookData) {
//         if (book.isComplete === true) {
//             let row = document.createElement('article');
//             row.className = 'book_item'
//             row.innerHTML = '<h3>' + book.judul + '</h3><p>' + book.penulis + '<p>' + book.tahun + '<p>';
//             let actionDiv = document.createElement('div');
//             actionDiv.className = 'action';
//             let selesaiButton = document.createElement('button');
//             selesaiButton.className = 'green';
//             selesaiButton.innerHTML = "Selesai Dibaca";
//             let hapusButton = document.createElement('button');
//             hapusButton.className = 'red';
//             hapusButton.innerHTML = "Hapus";
//             actionDiv.appendChild(selesaiButton);
//             actionDiv.appendChild(hapusButton);
//             // actionDiv.innerHTML = '<button class="green">Selesai dibaca</button><button class="red">Hapus buku</button>';
//             row.appendChild(actionDiv);  
//             bookList2.appendChild(row);
//         }
// }
// }
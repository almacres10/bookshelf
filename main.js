    const storageKey = 'STORAGE_KEY';
    const submitAction = document.getElementById('inputBook');
    let bookData = [];
    const RENDER_EVENT = 'render-todo';


    function checkForStorage() {
        return typeof (Storage) !== 'undefined';
    }

    function getBookList() {
        if (checkForStorage()) {
            return JSON.parse(localStorage.getItem(storageKey) || [] );
        } else {
            return [];
        }
    }

    function selesaiFungsi(bookId) {

        const todoTarget = findBook(bookId);
        if (todoTarget == null) return;
      
        todoTarget.isComplete = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
        
      }

      function findBook(bookId) {
        const bookData = getBookList();
        for (const bookItem of bookData) {
          if (bookItem.id === bookId) {
            return bookItem;
          }
        }
        return null;
      }

    submitAction.addEventListener('submit', function(event){
        event.preventDefault();
        const idBuku = + new Date();
        const inputJudul = document.getElementById('inputBookTitle').value;
        const inputPenulis = document.getElementById('inputBookAuthor').value;
        const inputTahun = document.getElementById('inputBookYear').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;
        const newBookData = {
            id : idBuku,
            judul : inputJudul,
            penulis : inputPenulis,
            tahun : inputTahun,
            isComplete : isComplete,
        }

        if (isComplete === true){
            putBookList(newBookData);
            renderBookListComplete();
        }else{
            putBookList(newBookData);
            renderBookListIncomplete();
        }
    });

    function putBookList(data) {
        if (checkForStorage()){
            if (localStorage.getItem(storageKey) !== null) {
            bookData = JSON.parse(localStorage.getItem(storageKey));
        }
        bookData.unshift(data);
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    }
    }

    function renderBookListComplete(){
        const bookData = getBookList();
        const bookList2 = document.getElementById('completeBookshelfList');
        bookList2.innerHTML = '';
        for(let book of bookData) {
            if (book.isComplete === true) {
                let row = document.createElement('article');
                row.className = 'book_item'
                row.innerHTML = '<h3>' + book.judul + '</h3><p>' + book.penulis + '<p>' + book.tahun + '<p>';
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
                // actionDiv.innerHTML = '<button class="green">Selesai dibaca</button><button class="red">Hapus buku</button>';
                row.appendChild(actionDiv);  
                bookList2.appendChild(row);
            }
    }
    }

    function renderBookListIncomplete(){
        const bookData = getBookList();
        const bookList = document.getElementById('incompleteBookshelfList');
        bookList.innerHTML = '';
        for(let book of bookData) {
            if (book.isComplete === false) {
                let row = document.createElement('article');
                row.className = 'book_item'
                row.innerHTML = '<h3>' + book.judul + '</h3><p>' + book.penulis + '<p>' + book.tahun + '<p>';
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
                
                selesaiButton.addEventListener('click', function () {
                    selesaiFungsi(book.id);
                    console.log('klik berhasil');
                    console.log(book.id);
                });


                row.appendChild(actionDiv);  
                bookList.appendChild(row);
            }
        }
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
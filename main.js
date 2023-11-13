    const storageKey = 'STORAGE_KEY';
    const submitAction = document.getElementById('inputBook');

    function checkForStorage() {
        return typeof (Storage) !== 'undefined';
    }

    function putBookList(data) {
        if (checkForStorage()){
            let bookData = [];
            if (localStorage.getItem(storageKey) !== null) {
            bookData = JSON.parse(localStorage.getItem(storageKey));
        }
        bookData.unshift(data);
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    }
    }

    function getBookList() {
        if (checkForStorage()) {
            return JSON.parse(localStorage.getItem(storageKey) || [] );
        } else {
            return [];
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
                    addToCompleted(book.id)
                });


                row.appendChild(actionDiv);  
                bookList.appendChild(row);
            }
        }
    }

    function addToCompleted (bookId) {
        const bookTarget = findBook(bookId);
        if (bookTarget == null) return;
        bookTarget.isComplete = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findBook(bookId) {
        for (const book of bookData) {
          if (book.id === bookIdId) {
            return book;
          }
        }
        return null;
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
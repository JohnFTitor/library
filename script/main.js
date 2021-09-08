const booksContainer = document.querySelector("#booksContainer");
const newBook = document.querySelector("#addBook");
const bookForm = document.querySelector("#bookForm");
const booksInventory = document.querySelector("#booksInventory");
const overlay = document.querySelector("#overlay");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookIsRead = document.querySelector("#isRead");
const addSubmit = document.querySelector("#addSubmit");
const coverURL = document.querySelector("#coverURL");

let myLibrary = [];
let index = 0;
// let offSet = 0;

function Book(title, author, pages, isRead, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.cover = cover;
}

Book.prototype.info = function () {
    return `${this.isRead ? "Already read" : "Not read yet"}`;
}

Book.prototype.changeReadStatus = function () {
    //Toggle Read Status
    this.isRead = this.isRead? false : true;
}

function addBookToLibrary(title, author, pages, isRead, cover) {
    let book = new Book(title, author, pages, isRead, cover);
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach((book) => {
        if (!('index' in book)) {
            //Define pages elements
            const bookCard = document.createElement('div');
            const bookDiv = document.createElement('div');
            const title = document.createElement('p');
            const author = document.createElement('p');
            const pages = document.createElement('p');
            const isRead = document.createElement('p');
            const cover = document.createElement('div');
            const isReadContainer = document.createElement('div');

            //Create Toggle Read Switch
            const isReadSwitch = document.createElement('label');
            const isReadButton = document.createElement('INPUT');
            const slider = document.createElement('span');

            isReadButton.setAttribute("type", "checkbox");

            isReadSwitch.appendChild(isReadButton);
            isReadSwitch.appendChild(slider);
            isReadSwitch.classList.add('switch');
            slider.classList.add('slider');
            
            //Define Edition elements
            const editionContainer = document.createElement('div');
            const removeButton = document.createElement('button');
            const editButton = document.createElement('button');

            //Add classes
            bookCard.classList.add('bookCard');
            bookDiv.classList.add('book');
            title.classList.add('info');
            author.classList.add('info');
            pages.classList.add('info');
            isRead.classList.add('info');
            editionContainer.classList.add('editionContainer');
            removeButton.classList.add('removeButtons');
            removeButton.classList.add('editionButtons');
            editButton.classList.add('editButtons');
            editButton.classList.add('editionButtons');
            isReadContainer.classList.add('editionContainer');
            cover.classList.add('cover');

            //Add object information
            editButton.textContent = "Edit";
            removeButton.textContent = "Remove";
            title.textContent = `Title: ${book.title}`;
            author.textContent = `Author: ${book.author}`;
            pages.textContent = `${book.pages} pages`;
            isRead.textContent = book.info();
            isReadButton.checked = book.isRead;

            if (book.cover === ""){
                let coverTitle = document.createElement('p');
            }

            //Append childs in the right order
            editionContainer.appendChild(editButton);
            editionContainer.appendChild(removeButton);
            bookDiv.appendChild(editionContainer);
            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(pages);
            isReadContainer.appendChild(isRead);
            isReadContainer.appendChild(isReadSwitch);
            bookDiv.appendChild(isReadContainer);

            //Adding index to the book
            book.index = index;
            bookCard.id = index;
            index++;


            //Finally, append the book card to the father
            bookCard.appendChild(bookDiv);
            booksContainer.appendChild(bookCard);

            removeButton.addEventListener('click', () => {
                booksContainer.removeChild(bookCard);
                let currentIndex = book.index; 
                myLibrary.splice(currentIndex, 1);
                updateIndex(currentIndex);
            })

            editButton.addEventListener('click', () => {
                bookForm.style.display = "flex";
                overlay.style.display = "block";
                addSubmit.style.display = "none";

                //Creates a new Submit button which handles the edition
                const editSubmit = document.createElement("INPUT");
                editSubmit.setAttribute("type", "submit");
                editSubmit.classList.add("submit");
                editSubmit.classList.add("edition");
                editSubmit.value = "Edit Book";
                bookForm.appendChild(editSubmit);

                //Removes default behaviour of the bookForm
                bookForm.removeEventListener('submit', addBookToContainer);

                bookTitle.value = book.title;
                bookAuthor.value = book.author;
                bookPages.value = book.pages;
                bookIsRead.checked = book.isRead;

                editSubmit.addEventListener("click", () => {
                    book.title = bookTitle.value;
                    book.author = bookAuthor.value;
                    book.pages = parseInt(bookPages.value);
                    book.isRead = bookIsRead.checked;
                    
                    title.textContent = `Title: ${book.title}`;
                    author.textContent = `Author: ${book.author}`;
                    pages.textContent = `${book.pages} pages`;
                    isRead.textContent = book.info();
                    isReadButton.checked = book.isRead;

                    disappearForm();
                })
            })

            isReadButton.addEventListener('click', () => {
                book.changeReadStatus();
                isRead.textContent = book.info();
            })
            
        }
    })
}

bookForm.addEventListener('submit', (event) => {
    //Removes default behavior of submit button
    event.preventDefault();
})


function addBookToContainer(event) {
    //Gets the values of the form 
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let isRead = bookIsRead.checked;
    let cover = coverURL.value;

    addBookToLibrary(title, author, pages, isRead, cover);
    displayBooks();
    disappearForm();
    //Resets form

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookIsRead.checked = false;
    coverURL.value = "";
}


function updateIndex(currentIndex){
    for (currentIndex; currentIndex < myLibrary.length; currentIndex++) {
        myLibrary[currentIndex].index--;
    }
}

function disappearForm() {
    overlay.style.display = "none";
    bookForm.style.display = "none";
    let editionNodes = document.querySelectorAll(".edition");
    editionNodes.forEach( (editSubmit) => {
        bookForm.removeChild(editSubmit);
    })
}

newBook.addEventListener('click', () => {
    //Resets form values in case someone were to edit and canceled
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookIsRead.checked = false;
    coverURL.value = "";

    //Pops up the form
    bookForm.style.display = "flex";
    overlay.style.display = "block";
    addSubmit.style.display = "block";
    bookForm.addEventListener('submit', addBookToContainer);
})

overlay.addEventListener('click', disappearForm);

addBookToLibrary("The Hobbit", "TYest", 589, true, "");
displayBooks();
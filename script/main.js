const booksContainer = document.querySelector("#booksContainer");
const newBook = document.querySelector("#addBook");
const bookForm = document.querySelector("#bookForm");
const booksInventory = document.querySelector("#booksInventory");
const overlay = document.querySelector("#overlay");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookIsRead = document.querySelector("#isRead");


let myLibrary = [];
let index = 0;

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function(){
    return `${this.isRead?"Already read":"Not read yet"}`;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title,author,pages,isRead);
    myLibrary.push(book);
}

function displayBooks(){
    myLibrary.forEach((book) => {
        if (!('index' in book)){
            //Define pages elements
            const bookCard = document.createElement('div');
            const bookDiv = document.createElement('div');
            const title = document.createElement('p');
            const author = document.createElement('p');
            const pages = document.createElement('p');
            const isRead = document.createElement('p');
            

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
    
            //Add object information
            editButton.textContent = "Edit";
            removeButton.textContent = "Remove";
            title.textContent = `Title: ${book.title}`;
            author.textContent = `Author: ${book.author}`;
            pages.textContent = `${book.pages} pages`;
            isRead.textContent = book.info();
            
            //Append childs in the right order
            editionContainer.appendChild(editButton);
            editionContainer.appendChild(removeButton);
            bookDiv.appendChild(editionContainer);
            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(pages);
            bookDiv.appendChild(isRead);
    
            //Adding index to the book
            index++;
            book.index = index;
            bookCard.id = index;
    
            //Finally, append the book card to the father
            bookCard.appendChild(bookDiv);
            booksContainer.appendChild(bookCard);       
        }
    })
}

function disappearForm() {
    overlay.style.display = "none";
    bookForm.style.display = "none";
}

newBook.addEventListener('click', () => {
    bookForm.style.display = "flex";
    overlay.style.display = "block";
})

overlay.addEventListener('click', disappearForm);

bookForm.addEventListener('submit', (event) => {
    //Removes default behavior of submit button
    event.preventDefault();

    //Gets the values of the form 
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let isRead = bookIsRead.checked;

    addBookToLibrary(title,author,pages,isRead);
    displayBooks();
    disappearForm();
    //Resets form

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookIsRead.checked = false;


})

addBookToLibrary("The Hobbit", "Unknown", 589, true);
displayBooks();
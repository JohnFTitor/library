const booksContainer = document.querySelector("#booksContainer");
const newBook = document.querySelector("#addBook");

let myLibrary = [];
let index = 0;

function Books(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Books.prototype.info = function(){
    return `${this.isRead?"Already read":"Not read yet"}`;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Books(title,author,pages,isRead);
    myLibrary.push(book);
}

function displayBook(){
    myLibrary.forEach((book) => {
        if (!('index' in book)){
            //Define pages elements
            const bookDiv = document.createElement('div');
            const title = document.createElement('p');
            const author = document.createElement('p');
            const pages = document.createElement('p');
            const isRead = document.createElement('p');
            
            //Add classes
            bookDiv.classList.add('book');
            title.classList.add('info');
            author.classList.add('info');
            pages.classList.add('info');
            isRead.classList.add('info');
    
            //Add object information
            title.textContent = `Title: ${book.title}`;
            author.textContent = `Author: ${book.author}`;
            pages.textContent = `${book.pages} pages`;
            isRead.textContent = book.info();
    
            //Append childs in the right order
            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(pages);
            bookDiv.appendChild(isRead);
    
            //Adding index to the book
            index++;
            book.index = index;
            bookDiv.id = index;
    
            //Finally, append the book card to the father
            booksContainer.appendChild(bookDiv);       
        }
    })
}





addBookToLibrary("The Hobbit", "Don't Know", 458, false);
addBookToLibrary("The Master", "John Strabusky", 558, false);
addBookToLibrary("The Pringle", "Starback Son", 1458, true);

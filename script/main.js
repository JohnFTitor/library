let myLibrary = [];

function Books(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Books.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead?"already read":"not read yet"}`
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Books(title,author,pages,isRead);
    myLibrary.push(book);
}

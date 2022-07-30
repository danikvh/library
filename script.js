let myLibrary = [];

let tbodyRef = document.getElementById("myTable").getElementsByTagName("tbody")[0]

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let readString;
    if (read === true) readString = "read";
    else readString = "not read yet";
    return title + ", " + author + ", " + pages + ", " + readString;
  }
}

function addBookToLibrary() {
  const title = prompt("What is the book title?") 
  const author = prompt("Who is the author?") 
  const pages = prompt("How many pages does the nook have?") 
  const read = prompt("Have you read the book?") 
  myLibrary.push(new Book(title, author, pages, read))
}

function displayBooks() {
  myLibrary.forEach((book) => {
    let newRow = tbodyRef.insertRow()
    for (let i = 0; i < 4; i++) {
      let newCell = newRow.insertCell()
      let newText = document.createTextNode(Object.values(book)[i])
      newCell.appendChild(newText)
    }
  })
}

myLibrary.push(new Book("fds","fasdgf", "543", "true"))
displayBooks()
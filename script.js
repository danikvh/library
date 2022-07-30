let myLibrary = [];

let tbodyRef = document.getElementById("myTable").getElementsByTagName("tbody")[0]
let popupButton = document.getElementById("popup-button")
let modal = document.getElementById("myModal")
let submitButton = document.getElementById("submit-button")

popupButton.addEventListener("click", showForm)
window.addEventListener("click", this.closeModal)
submitButton.addEventListener("click", addBookToLibrary)


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  read === true ? (this.read = "Read") : (this.read = "Not read yet")
  this.info = function() {
    return title + ", " + author + ", " + pages + ", " + read;
  }
}

function addBookToLibrary() {
  const title = document.querySelector("input[name$='title']").value 
  const author = document.querySelector("input[name$='author']").value
  const pages = document.querySelector("input[name$='pages']").value
  const read = document.querySelector("input[name$='read']").checked
  let book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayBook(book)
  modal.style.display = "none";
}

function displayBooks() {
  myLibrary.forEach((book) => {
    displayBook(book)
  })
}

function displayBook(book) {
  let newRow = tbodyRef.insertRow()
  for (let i = 0; i < 4; i++) {
    let newCell = newRow.insertCell()
    let newText = document.createTextNode(Object.values(book)[i])
    newCell.appendChild(newText)
  }
}

function showForm() {
  modal.style.display = "block"
}

function closeModal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


myLibrary.push(new Book("The Lord of the Rings","J. R. R. Tolkien", "543", true))
displayBooks()
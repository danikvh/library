let myLibrary = [];

const tbodyRef = document.getElementById("myTable").getElementsByTagName("tbody")[0]
const popupButton = document.getElementById("popup-button")
const modal = document.getElementById("myModal")
const submitButton = document.getElementById("submit-button")
const cancelButton = document.getElementById("cancel-button")
const title = document.querySelector("input[name$='title']")
const author = document.querySelector("input[name$='author']")
const pages = document.querySelector("input[name$='pages']")
const read = document.querySelector("input[name$='read']")

popupButton.addEventListener("click", showForm)
window.addEventListener("click", this.closeModalClick)
cancelButton.addEventListener("click", closeModal)
submitButton.addEventListener("click", addBookToLibrary)

//JAVASCRIPT FORM VALIDATION
pages.addEventListener("input", (event) => {
  if (pages.validity.rangeOverflow === true) {
    pages.setCustomValidity("Put the real number of pages!");
    pages.reportValidity();
    pages.classList.add("form-container-input-invalid")
  } else {
    pages.setCustomValidity("");
  }
})


//CLASSES

class Book {

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    read === true ? (this.read = "Read") : (this.read = "Not read yet")
  }

  info() {
    return title + ", " + author + ", " + pages + ", " + read;
  }
}


//METHODS BOOK

function addBookToLibrary() {
  if (pages.validity.valid === false || title.validity.valid === false ||
    author.validity.valid === false) {
      return
  } 
  let book = new Book(title.value, author.value, pages.value, read.checked)
  myLibrary.push(book)
  displayBooks()
  closeModal()
  saveLocal()
}

function displayBooks() {
  tbodyRef.innerHTML = ""
  myLibrary.forEach((book) => {
    displayBook(book)
  })
}

function displayBook(book) {
  let newRow = tbodyRef.insertRow()
  for (let i = 0; i < 4; i++) {
    let newCell = newRow.insertCell()
    if (i == 3) createReadCheck(newCell, book)
    let newText = document.createTextNode(Object.values(book)[i])
    newCell.appendChild(newText)
  }
  createRemoveButton(newRow, book)
}

function createRemoveButton(row, book) {
  let removeButton = document.createElement("button")
  removeButton.classList.add("remove-button")
  removeButton.textContent = "Remove Book"
  removeButton.name = book.title
  removeButton.addEventListener("click", deleteBook)
  let newCell = row.insertCell()
  newCell.appendChild(removeButton)
}

function createReadCheck(cell, book) {
  let readCheck = document.createElement("input")
  readCheck.setAttribute("type", "checkbox")
  readCheck.book = book
  book.read === "Read" ? readCheck.checked = true : readCheck.checked = false
  readCheck.addEventListener("click", changeReadStatus)
  cell.appendChild(readCheck)
}

function deleteBook(evt) {
  const title = evt.currentTarget.name
  myLibrary = myLibrary.filter((book) => book.title !== title)
  displayBooks()
  saveLocal()
}

function changeReadStatus(evt) {
  const chkBox = evt.currentTarget
  chkBox.checked === false ? chkBox.book.read = "Not read yet" : chkBox.book.read = "Read"
  const index = myLibrary.findIndex(book => book.title === chkBox.book.title)
  myLibrary[index] = chkBox.book
  displayBooks()
}


//METHODS FORM

function showForm() {
  modal.style.display = "block"
}

function closeModal() {
  modal.style.display = "none";
  //resetForm() //Not needed anymore with submit button
}

function closeModalClick(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function resetForm() {
  document.querySelector("input[name$='title']").value = ""
  document.querySelector("input[name$='author']").value = ""
  document.querySelector("input[name$='pages']").value = ""
  document.querySelector("input[name$='read']").checked = false
}


//STORAGE

const saveLocal = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary))
}

const restoreLocal = () => {
  const books = JSON.parse(localStorage.getItem('library'))
  if (books) {
    myLibrary = books.map((book) => JSONToBook(book))
  } else {
    myLibrary = []
  }
}

const JSONToBook = (book) => {
  return new Book(book.title, book.author, book.pages, book.read)
}


// INITIALIZATION

restoreLocal() 
displayBooks()
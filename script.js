let myLibrary = [];

let tbodyRef = document.getElementById("myTable").getElementsByTagName("tbody")[0]
let popupButton = document.getElementById("popup-button")
let modal = document.getElementById("myModal")
let submitButton = document.getElementById("submit-button")
let cancelButton = document.getElementById("cancel-button")

popupButton.addEventListener("click", showForm)
window.addEventListener("click", this.closeModalClick)
cancelButton.addEventListener("click", closeModal)
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
  const title = document.querySelector("input[name$='title']")
  const author = document.querySelector("input[name$='author']")
  const pages = document.querySelector("input[name$='pages']")
  const read = document.querySelector("input[name$='read']")
  let book = new Book(title.value, author.value, pages.value, read.checked)
  myLibrary.push(book)
  displayBooks()
  closeModal()
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
}

function changeReadStatus(evt) {
  const chkBox = evt.currentTarget
  chkBox.checked === false ? chkBox.book.read = "Not read yet" : chkBox.book.read = "Read"
  const index = myLibrary.findIndex(book => book.title === chkBox.book.title)
  myLibrary[index] = chkBox.book
  displayBooks()
}

function showForm() {
  modal.style.display = "block"
}

function closeModal() {
  modal.style.display = "none";
  resetForm()
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


myLibrary.push(new Book("The Lord of the Rings","J. R. R. Tolkien", "45235", true))
myLibrary.push(new Book("Dune","Frank Herbert", "1042", false))
displayBooks()
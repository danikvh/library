let myLibrary = [];

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


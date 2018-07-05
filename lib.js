let myLibrary = []
let bookTitle, authorName, didRead

function Book(title,author,read) {
    this.title = title
    this.author = author;
    (read === true) ? (this.read ="Yes") : (this.read = "No")
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}. Read: ${this.read}`
}

function addBookToLibrary() {
  //Get book information
  bookTitle = document.getElementById('title_id').value
  authorName = document.getElementById('author_id').value
  didRead = document.getElementById('read_id').checked
  
  //Add to library if not blank
  if (bookTitle != "" && authorName != "") {
  newBook = new Book(bookTitle, authorName, didRead)
  myLibrary.push(newBook)
  render(newBook)

  //Reset fields
  document.getElementById('title_id').value = ""
  document.getElementById('author_id').value = ""
  document.getElementById('read_id').checked = false
  }
}

let bookList = document.querySelector('#book_list')
//Adds a book to the end of an ordered list
function render(aBook) {
  let bookInfo = document.createElement('tr')
  bookInfo.setAttribute('data-index',`${myLibrary.indexOf(aBook)}`)
  let numField = document.createElement('td')
  let titleField = document.createElement('td')
  let authorField = document.createElement('td')
  let readField = document.createElement('td')
  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add('deleteBtn')
  deleteBtn.textContent = '✕'
  deleteBtn.addEventListener('click', deleteBook)
  numField.textContent = myLibrary.indexOf(aBook) + 1
  titleField.textContent = aBook.title
  authorField.textContent = aBook.author
  readField.textContent = aBook.read
  bookInfo.appendChild(numField)
  bookInfo.appendChild(titleField)
  bookInfo.appendChild(authorField)
  bookInfo.appendChild(readField)
  bookInfo.appendChild(deleteBtn)
  bookList.appendChild(bookInfo)



}

function displayForm() {
  let form = document.getElementById('book_form');
  (form.style.display ==='none') ? (form.style.display = 'block') : (form.style.display = 'none')
}

deleteBook = function (e) {
  parentDataIndex = e.target.parentElement.dataset.index
  selectBook = document.querySelector(`[data-index='${parentDataIndex}']`)
  bookList.removeChild(selectBook)
}
let myLibrary = []
let bookTitle, authorName, didRead

function Book(title,author,status) {
    this.title = title
    this.author = author
    ;(status === true) ? (this.status ="Finished") : (this.status = "Reading")
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}. Read: ${this.status}`
}

function addBookToLibrary() {
  //Get book information
  bookTitle = document.getElementById('title_id').value
  authorName = document.getElementById('author_id').value
  didRead = document.getElementById('read_id').checked
  
  //Add to library if not blank
  if (bookTitle == "") {
    alert('Please add a title')
  } else if (authorName == "") {
    alert('Please type in the author\'s name')
  } else {
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
function render(newBook) {
  let bookInfo = document.createElement('tr')
  bookInfo.setAttribute('data-index',`${myLibrary.indexOf(newBook)}`)

  let numField = document.createElement('td')
  numField.textContent = myLibrary.indexOf(newBook) + 1

  let titleField = document.createElement('td')
  titleField.textContent = newBook.title

  let authorField = document.createElement('td')
  authorField.textContent = newBook.author

  let statusBtnContainer = document.createElement('td')

  let deleteBtnContainer = document.createElement('td')
  deleteBtnContainer.classList.add('deleteBtnContainer')

  let statusBtn = document.createElement('button')
  statusBtn.textContent = newBook.status
  statusBtn.classList.add('statusBtn')
  statusBtn.addEventListener('click', changeStatus)

  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add('deleteBtn')
  deleteBtn.textContent = '✕'
  deleteBtn.addEventListener('click', deleteBook)

  bookInfo.appendChild(numField)
  bookInfo.appendChild(titleField)
  bookInfo.appendChild(authorField)
  statusBtnContainer.appendChild(statusBtn)
  deleteBtnContainer.appendChild(deleteBtn)
  bookInfo.appendChild(statusBtnContainer)
  bookInfo.appendChild(deleteBtnContainer)
  bookList.appendChild(bookInfo)
}

changeStatus = function(e) {
  parentDataIndex = e.target.parentElement.parentElement.dataset.index
  selectBook = document.querySelector(`[data-index='${parentDataIndex}']`)
  ;(e.target.textContent === "Reading") ? (e.target.textContent = "Finished") : (e.target.textContent = "Reading") 
  myLibrary[parentDataIndex].toggleStatus()
}

Book.prototype.toggleStatus = function() {
  ;(this.status === "Reading") ? (this.status ="Finished") : (this.status = "Reading");
}

function displayForm() {
  let form = document.getElementById('book_form');
  form.style.display = 'block'
  let newBookBtn = document.querySelector('.newBook')
  newBookBtn.style.display = 'none'
  let doneBtn = document.querySelector('.doneBtn')
  doneBtn.style.display = 'block'
}

function hideForm() {
  let form = document.getElementById('book_form');
  form.style.display = 'none'
  let doneBtn = document.querySelector('.doneBtn')
  doneBtn.style.display = 'none'
  let newBookBtn = document.querySelector('.newBook')
  newBookBtn.style.display = 'block'
}

deleteBook = function(e) {
  parentDataIndex = e.target.parentElement.parentElement.dataset.index
  selectBook = document.querySelector(`[data-index='${parentDataIndex}']`)
  bookList.removeChild(selectBook)
  myLibrary.splice(parentDataIndex,1)
}
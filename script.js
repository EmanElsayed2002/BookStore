const number = document.getElementById("NoBook");
const textHero = document.querySelector(".hero-text");
const createBooks = document.querySelector(".create-Books");
const addBtn = document.querySelector("input[type='submit']");
const createBtn = document.querySelector("#createBtn");
const errorSpan = document.querySelector(".error");
const bookName = document.querySelector("#Bname");
const bookPrice = document.querySelector("#Bprice");
const authorName = document.querySelector("#Aname");
const authorEmail = document.querySelector("#Aemail");
const spans = document.querySelectorAll(".error");
const ListTable = document.querySelector(".List-books tbody");

const numExp = /^[0-9]+$/;
const nameExp = /^[a-zA-Z\s]{2,}$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

number.addEventListener("input", () => {
  if (numExp.test(number.value)) {
    errorSpan.classList.add("hidden");
  } else {
    errorSpan.classList.remove("hidden");
  }
});

function validateInput(input, regex, errorMsg, index) {
  if (regex.test(input.value)) {
    spans[index].innerHTML = "";
  } else {
    spans[index].innerHTML = errorMsg;
  }
}

bookName.addEventListener("input", () =>
  validateInput(bookName, nameExp, "Please Enter Only Letters", 1)
);
bookPrice.addEventListener("input", () =>
  validateInput(bookPrice, numExp, "Please Enter Valid Price", 2)
);
authorName.addEventListener("input", () =>
  validateInput(authorName, nameExp, "Please Enter Only Letters", 3)
);
authorEmail.addEventListener("input", () =>
  validateInput(authorEmail, emailExp, "Please Enter Valid Email", 4)
);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (numExp.test(number.value)) {
    errorSpan.classList.add("hidden");
    textHero.classList.add("hidden");
    createBooks.classList.remove("hidden");
  } else {
    errorSpan.classList.remove("hidden");
  }
});

let books = [];
function clearInputs() {
  bookName.value = "";
  bookPrice.value = "";
  authorName.value = "";
  authorEmail.value = "";
  spans.forEach((span) => (span.innerText = ""));
}

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let flag = false;
  if (!nameExp.test(bookName.value)) {
    spans[1].innerHTML = "Please Enter Only Letters";
    flag = true;
  }
  if (!numExp.test(bookPrice.value)) {
    spans[2].innerHTML = "Please Enter Valid Price";
    flag = true;
  }
  if (!nameExp.test(authorName.value)) {
    spans[3].innerHTML = "Please Enter Only Letters";
    flag = true;
  }
  if (!emailExp.test(authorEmail.value)) {
    spans[4].innerHTML = "Please Enter Valid Email";
    flag = true;
  }

  if (!flag) {
    let newAuthor = new Author(authorName.value, authorEmail.value);
    let newBook = new Book(bookName.value, bookPrice.value, newAuthor);
    books.push(newBook);

    let row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" value="${newBook.name}" disabled></td>
      <td><input type="text" value="${newBook.price}" disabled></td>
      <td><input type="text" value="${newBook.Author.name}" disabled></td>
      <td><input type="text" value="${newBook.Author.email}" disabled></td>
      <td><button class="edit-btn">Edit</button></td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    ListTable.appendChild(row);

    if (number.value > 0) {
      number.value--;
      clearInputs();
    }

    if (number.value == 0) {
      createBooks.classList.add("hidden");
      document.querySelector(".List-books").classList.remove("hidden");
    }

    createBtn.value = "Done";
  }
});

ListTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let row = e.target.parentElement.parentElement;
    console.log(ListTable.children);
    let index = [...ListTable.children].indexOf(row);

    if (index !== -1) {
      books.splice(index, 1);
      row.remove();
    }
  }
  if (e.target.classList.contains("edit-btn")) {
    let row = e.target.parentElement.parentElement;
    let index = [...ListTable.children].indexOf(row);
    let inputs = row.querySelectorAll("input");
    console.log(inputs);
    let isEditing = inputs[0].disabled;

    if (isEditing) {
      inputs.forEach((input) => (input.disabled = false));
      e.target.textContent = "Save";
      console.log(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.classList.add("editable");
    } else {
      if (!nameExp.test(inputs[0].value)) {
        alert("please Enter Valid Name");
        inputs[0].value = books[index].name;
      } else {
        books[index].name = inputs[0].value;
      }

      if (!numExp.test(inputs[1].value)) {
        alert("please Enter Valid number");
        inputs[1].value = books[index].price;
      } else {
        books[index].price = inputs[1].value;
      }

      if (!nameExp.test(inputs[2].value)) {
        alert("please Enter Valid Name");
        inputs[2].value = books[index].Author.name;
      } else {
        books[index].Author.name = inputs[2].value;
      }
      if (!emailExp.test(inputs[3].value)) {
        alert("please Enter Valid Email");
        inputs[3].value = books[index].Author.email;
      } else {
        books[index].Author.email = inputs[3].value;
      }
      e.target.parentElement.parentElement.classList.remove("editable");
      inputs.forEach((input) => (input.disabled = true));
      e.target.textContent = "Edit";
    }
  }
});

class Book {
  constructor(bookName, bookPrice, Author) {
    this.name = bookName;
    this.price = bookPrice;
    this.Author = Author;
  }
}

class Author {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

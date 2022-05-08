const list = document.querySelector("#list");
const addedList = document.querySelector("#added-list");
const input = document.querySelector("#input");
const addBtn = document.querySelector("#add-btn");
const favList = document.querySelector('.fav-list');
const backList = document.querySelector('.back-list');
let element = [];
let fav = [];

//fetching data
const API =
  "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=10";

async function fetchData() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}

fetchData().then((data) => {
  count = 1;
  data.map((el) => {
    const items = `
        <li>
        <p>${count}. ${el.text}</p>
        </li>
        `;
    list.innerHTML += items;
    count++;
  });
});

fetchData();

//adding data
addBtn.addEventListener("click", function () {
  if(input.value === ""){
    alert("Enter Proper Data");
    return
  }
  let textInput = input.value;
  let textHtml = `
    <li id='Added'>
    <p>${textInput}</p>
    <i class="fa-solid fa-heart"></i>
    <i class="fa-solid fa-trash-can"></i>
    </li>
    `;
  input.value = "";
  addedList.innerHTML += textHtml;
});

//delete button
addedList.addEventListener("click", function (el) {
  if (el.target.className === "fa-solid fa-trash-can") {
    el.target.parentElement.remove();
  }
});

//favorite button
addedList.addEventListener("click", function (el) {
  if (el.target.className === "fa-solid fa-heart") {
    el.target.style.backgroundColor = "black";
    el.target.style.color = "red";
    el.target.style.border = "1px solid green";
  }
});

favList.addEventListener("click", () => {
  addedList.innerHTML = "";
  for (let i in fav) {
    addedList.innerHTML += `
    <li id='added'>
    <p>${fav[i].innerText}</p>
    <i class="fa-solid fa-heart"></i>
    <i class="fa-solid fa-trash-can"></i>
    </li>
    `;
  }
});

backList.addEventListener("click", () => {
  addedList.innerHTML = "";
  for (let el in element) {
    if (!element[el]) {
      addedList.innerHTML += element[el];
    }
  }
});

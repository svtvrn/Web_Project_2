var searchBtn = document.querySelector(".search-bar input[type='submit']");
var searchInput = document.querySelector(".search-bar input[type='text']");

let url = 'https://reststop.randomhouse.com/resources/works/';

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    if(searchInput.value){
        fetch(url+searchInput.value)
        .then(res => res.text())
        .then(data => console.log(data));
    }
}
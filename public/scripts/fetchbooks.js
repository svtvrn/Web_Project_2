var searchBtn = document.querySelector(".search-bar input[type='submit']");
var searchInput = document.querySelector(".search-bar input[type='text']");

let url = 'https://reststop.randomhouse.com/resources/works/';

const searchResults = document.querySelector('.search-results');

var books = [];

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    if(searchInput.value){
        fetch(url+searchInput.value,{
            method: 'GET',
            headers :{
                'Accept': 'application/json'
            }
        })
        .then(res => res.ok ? res.json() : console.log("request failed"))
        .then(data => {
            searchResults.innerHTML = null;
            if(!data){
                searchResults.innerHTML = `Couldn't find the book with id: ${searchInput.value}.`;
            }else{
                console.log(data);
                searchResults.innerHTML += resultTemplate(data);
                createListeners(books);
            }
        })
        .catch(error => console.log(error));
    }
}

function resultTemplate(data){
    books.push(`wid-${data.workid}`);
    return (
        `<li id="wid-${data.workid}">
            <p>Title: ${data.titleweb}</p>
            <p>Author: ${data.authorweb}</p>
            <p>ID: ${data.workid}</p>
            <span class="fav-btngroup">
                <input id="add-fave" type="submit" value="add"></input>
                <input id="remove-fave" type="submit" value="remove"></input>
            </span>
        </li>`
    );
}

function createListeners(books){
    books.forEach(book => {
        let add = document.querySelector(`#${book} #add-fave`);
        
    });
}

function addBook(book){
    console.log(`${book} added`);
}

function removeBook(book){
    console.log(`${book} removed`);
}
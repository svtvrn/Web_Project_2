var searchBtn = document.querySelector(".search-bar input[type='submit']");
var searchInput = document.querySelector(".search-bar input[type='text']");

let url = 'https://reststop.randomhouse.com/resources/works/';

const searchResults = document.querySelector('.search-results');

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    if(searchInput.value){
        fetch(url+searchInput.value,{
            method: 'GET',
            headers :{
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            searchResults.innerHTML = null;
            if(!data.workid){
                searchResults.innerHTML = `Couldn't find the book with id: ${searchInput.value}.`;
            }else{
                console.log(data);
                searchResults.innerHTML = resultTemplate(data);
            }
        });
    }
}

function resultTemplate(data){

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
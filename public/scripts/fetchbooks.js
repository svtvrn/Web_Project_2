var searchBtn = document.querySelector(".search-bar input[type='submit']");
var searchInput = document.querySelector(".search-bar input[type='text']");

let worksIdUrl = 'https://reststop.randomhouse.com/resources/works/';
let worksUrl = 'https://reststop.randomhouse.com/resources/works?search=';

const searchResultsDOM = document.querySelector('.search-results');

var bookData= [];

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    if(searchInput.value){
        fetch(worksUrl+searchInput.value,{
            method: 'GET',
            headers :{
                'Accept': 'application/json'
            }
        })
        .then(res => res.ok ? res.json() : console.log("Request Failed"))
        .then(data => {
            searchResultsDOM.innerHTML = null;
            if(!data){
                searchResultsDOM.innerHTML = `Couldn't find the book with id: ${searchInput.value}.`;
            }else{
                console.log(data.work);
                data.work.forEach( element =>  searchResultsDOM.innerHTML += resultTemplate(element));
            }
        })
        .catch(error => console.log(error));
    }
}

function resultTemplate(data){
    bookData.push({key: data.workid, value: data});
    return (
        `<li id="wid-${data.workid}">
            <p>Title: ${data.titleweb}</p>
            <p>Author: ${data.authorweb}</p>
            <p>ID: ${data.workid}</p>
            <span class="fav-btngroup">
                <input id="add-fave" type="submit" value="add" onclick="addBook('${data.workid}')"></input>
                <input id="remove-fave" type="submit" value="remove" onclick="removeBook('${data.workid}')"></input>
            </span>
        </li>`
    );
}

function addBook(wid){
    console.log(wid);
    console.log(bookData[0]);
}

function removeBook(wid){
    console.log(wid);
    console.log(bookData);
}
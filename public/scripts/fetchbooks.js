var searchBtn = document.querySelector(".search-bar input[type='submit']");
var searchInput = document.querySelector(".search-bar input[type='text']");

const worksIdUrl = 'https://reststop.randomhouse.com/resources/works/';
const worksUrl = 'https://reststop.randomhouse.com/resources/works?search=';

const searchResultsDOM = document.querySelector('.search-results');

var bookData= new Map();

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    if(searchInput.value){
        searchResultsDOM.innerHTML = null;
        fetch(worksUrl+searchInput.value,{
            method: 'GET',
            headers :{
                'Accept': 'application/json'
            }
        })
        .then(res => res.ok ? res.json() : console.log("Request Failed"))
        .then(data => {
            if(!data || typeof data.work === 'undefined'){
                searchResultsDOM.innerHTML = `Couldn't find any results for: ${searchInput.value}.`;
            }else{
                if(data.work.length){
                    for (let element of data.work) searchResultsDOM.innerHTML += resultTemplate(element);
                }else{
                    searchResultsDOM.innerHTML += resultTemplate(data.work);
                }
            }
        })
        .catch(error => console.log(error));
    }
}

function resultTemplate(data){
    bookData.set(data.workid, data);
    return (
        `<li id="wid-${data.workid}">
            <p>Title: ${data.titleweb}</p>
            <p>Author: ${data.authorweb}</p>
            <p>ID: ${data.workid}</p>
            <span class="fav-btngroup">
                <input id="add-fave" type="submit" value="fave" onclick="addBook('${data.workid}')"></input>
                <input id="remove-fave" type="submit" value="remove" onclick="removeBook('${data.workid}')"></input>
            </span>
        </li>`
    );
}

function addBook(wid){
    document.querySelector('#add-fave').style.display = 'none';
    document.querySelector('#remove-fave').style.display = 'initial';
    fetch('http://localhost:3000/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg:{ action: 'add', data: bookData.get(wid)}
        })
    });
}

function removeBook(wid){
    document.querySelector('#remove-fave').style.display = 'none';
    document.querySelector('#add-fave').style.display = 'initial';
    fetch('http://localhost:3000/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg:{ action: 'remove', data: bookData.get(wid)}
        })
    });}
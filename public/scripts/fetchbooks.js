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
                <input id="add-fave" class="manage-book" type="submit" value="fave" onclick="manageBook('${data.workid}')"></input>
            </span>
            <p id="response-msg"></>
        </li>`
    );
}

function manageBook(wid){

    let manageBtn = document.querySelector(`#wid-${wid} .manage-book`);

    if (manageBtn.value === 'fave'){
        manageBtn.setAttribute('value','remove');
        manageBtn.id = 'remove-fave';
        fetch('http://localhost:3000/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msg:{ action: 'add', data: bookData.get(wid)}
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg === "F0"){
                document.querySelector(`#wid-${wid} #response-msg`).innerHTML = "You've already saved this book! You can remove it if you wish to.";
            }
        });
    }else if (manageBtn.value === 'remove'){
        manageBtn.setAttribute('value','fave');
        manageBtn.id = 'add-fave';
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msg:{ action: 'remove', data: bookData.get(wid)}
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg === "F1"){
                document.querySelector(`#wid-${wid} #response-msg`).innerHTML = "We couldn't remove this book..";
            }
        });
    }
}

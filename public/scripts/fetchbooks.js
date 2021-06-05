//Search bar DOM selectors.
const searchBtn = document.querySelector(".search-bar input[type='submit']");
const searchInput = document.querySelector(".search-bar input[type='text']");

//Penguin House API URL to fetch books from.
const worksIdUrl = 'https://reststop.randomhouse.com/resources/works/';
const worksUrl = 'https://reststop.randomhouse.com/resources/works?search=';
//Search results selector
const searchResultsDOM = document.querySelector('.search-results');
//Map that JSON files are stored.
var bookData= new Map();

searchBtn.addEventListener('click', fetchBooks);

function fetchBooks(){
    //If search bar input isn't empty, then attempt a fetch request.
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
            //If no data is returned then display the following message.
            if(!data || data.work === undefined){
                searchResultsDOM.innerHTML = `Couldn't find any results for: ${searchInput.value}.`;
            }else{
                //If multiple works are returned, iterate through them and add them to the Html file.
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
    
    //Html list item template
    return (
        `<li id="wid-${data.workid}">
            <span class="li-cont">
                <span id="work-inf">
                    <p>Title: ${data.titleweb}</p>
                    <p>Author: ${data.authorweb}</p>
                    <p>ID: ${data.workid}</p>
                </span>
                <span class="fav-btngroup">
                    <input id="add-fave" type="submit" value="fave" onclick="addBook('${data.workid}')"></input>
                    <input id="remove-fave" type="submit" value="remove" onclick="removeBook('${data.workid}')"></input>
                </span>
            </span>
            <p id="response-msg"></p>
        </li>`
    );
}

function addBook(wid){
    //Hides the "fave" button and displays the remove button, to undo the action.
    document.querySelector(`#wid-${wid} #add-fave`).style.display = 'none';
    document.querySelector(`#wid-${wid} #remove-fave`).style.display = 'initial';
    let resMsg = document.querySelector(`#wid-${wid} #response-msg`);

    fetch('/',{
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
            resMsg.innerHTML = "You've already saved this book! You can remove it if you wish to.";
        }
    })
    .catch(error => console.log(error));
}

function removeBook(wid){
    //Hides the remove button and displays the "fave" button again.
    document.querySelector(`#wid-${wid} #remove-fave`).style.display = 'none';
    document.querySelector(`#wid-${wid} #add-fave`).style.display = 'initial';
    let resMsg = document.querySelector(`#wid-${wid} #response-msg`);
    //Response message is removed when the button changes back to fave.
    resMsg.innerHTML = "";

    fetch('http://localhost:3000/',{
        method: 'DELETE',
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
            resMsg.innerHTML = "A problem occured, the book couldn't be removed..";
        }
    })
    .catch(error => console.log(error));
}

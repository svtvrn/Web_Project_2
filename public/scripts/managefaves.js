const filterInput = document.querySelector('.filter-bar');
const booklist = document.querySelector('.search-results').querySelectorAll('li');

//Timeout var to check whether the user has stopped typing.
var timeout;

filterInput.addEventListener('keyup',(e)=>{
    let filter = e.target;
    //If user is still typing, clear the timeout.
    if(timeout !== null){
        clearTimeout(timeout);
    }
    //After user is done typing, call the filter function.
    timeout = setTimeout(()=>{
        filterList(filter.value);
    }, 1000);
});

function editBook(wid){
    window.location = `/favorites/edit/${wid}`;
}

//Remove work from database.
function removeFromColl(wid){

    fetch('http://localhost:3000/favorites/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg:{ action: 'remove', data: wid }
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.msg === "S1"){
            //Removes book from the Html file, after it's removed from the database.
            return document.querySelector(`#wid-${wid}`).remove();
        }else{
            return console.log("An error occured while removing the book.");
        }
    })
    .catch(err => console.log("Oops."));
}

//Filters the saved books based on a keyword.
function filterList(filter){

    //Unhide any book previously hidden.
    for (let book of booklist){
        book.className = 'li-cont';
    }
    
    fetch('/favorites/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg:{ action: 'filter', data: filter }
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.msg === "F2"){
            return console.log("An error occured while filtering.");
        }else{
            //Every book that doesn't match with the filter gets hidden.
            for (let book of data.msg){
                document.querySelector(`#wid-${book.workid}`).className = 'hidden-book';
            }
        }
    })
    .catch(err => console.log("Oops."));
}

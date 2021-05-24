const filterInput = document.querySelector('.filter-bar');
var timeout;
var booklist = document.querySelector('.search-results').querySelectorAll('li');
;
filterInput.addEventListener('keyup',(e)=>{
    var filter = e.target;
    if(timeout !== null){
        clearTimeout(timeout);
    }
    timeout = setTimeout(()=>{
        filterList(filter.value);
    }, 1000);
});
    

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
            return document.querySelector(`#wid-${wid}`).remove();
        }else{
            return console.log("An error occured while removing the book.");
        }
    });
}

function filterList(filter){

    for (let book of booklist){
        book.className = 'saved-book';
    }
    
    fetch('http://localhost:3000/favorites/',{
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
            for (let book of data.msg){
                document.querySelector(`#wid-${book.workid}`).className = 'hidden-book';
            }
        }
    })
    .catch(err => console.log("Oops."));
}

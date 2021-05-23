const filterInput = document.querySelector('.filter-bar');
var timeout;

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
        if(data.msg === "S2"){
            return document.querySelector(`#wid-${wid}`).remove();
        }
    })
    .catch(err => console.log("Oops."));
}

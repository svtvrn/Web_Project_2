const filterInput = document.querySelector('.filter-bar');

filterInput.addEventListener('input', filterList);


function filterList(){
    setTimeout(()=>{
        console.log(filterInput.value);
    },2000);
}

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
        }
    });
}


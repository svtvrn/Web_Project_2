const title = document.querySelector('#title');
const author = document.querySelector('#author');
const wid = document.querySelector('#wid');
const comment = document.querySelector('#comm');
const saveBtn = document.querySelector('#save-btn');

saveBtn.addEventListener('click', updateBook);

function updateBook(){
    
    fetch(`http://localhost:3000/favorites/edit/${wid.value}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg:{ action: 'update',
            book:{
                titleweb : title.value,
                authorweb : author.value,
                workid: wid.value,
                comment : comment.value } 
            }
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.msg === "S3"){
            return;
        }else{
            return console.log("Edit failed.")
        }
    })
    .catch( err => console.log("Oops. Something went wrong!"));
}
//Work fields selectors.
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const wid = document.querySelector('#wid');
const comment = document.querySelector('#comm');
const saveBtn = document.querySelector('#save-btn');

//Save changes button.
saveBtn.addEventListener('click', updateBook);

function updateBook(){

    fetch(`/favorites/edit/${wid.value}`,{
        method: 'PUT',
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
        if(data.msg !== "S3"){
            return console.log("Update failed.")
        }
    })
    .catch( err => console.log("Oops. Something went wrong!"));
}
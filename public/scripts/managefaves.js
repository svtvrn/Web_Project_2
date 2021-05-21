const filterInput = document.querySelector('.filter-bar');

filterInput.addEventListener('input', filterList);


function filterList(){
    setTimeout(()=>{
        console.log(filterInput.value);
    },2000);
}
const modal = document.querySelector("#modal");
const openButton = document.querySelector(".f_subscribe_input_btn");
const closeButton = document.querySelector(".modal_ok_btn");


function openModal(){
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
}
function closeModal(){
    modal.style.display = 'none';
}
window.onclick = function (event){
    if (event.target == modal){
        closeModal();
    }
}

openButton.addEventListener('click',openModal)
closeButton.addEventListener('click',closeModal)
//Variables
const myLibrary = [
    {title: "Corazón tinieblas", author:"J Conrad", pages:300, read:"Yes"},
    {title: "Vagalume", author:"J Llamazares", pages:250, read:"Yes"},
    {title: "Imperio", author:"J Gallego", pages:290, read: "No"}
];

let author, title, pages, read;

const newBookBtn = document.getElementById("newBookBtn");
const newBookModal  = document.getElementById("newBookModal");
const newBookAuthor = document.getElementById("author");
const newBookTitle = document.getElementById("title");
const newBookPages = document.getElementById("pages");
const newBookRead = document.getElementById("read");
const notRead = document.getElementById("readNo");
const addBookBtn = document.getElementById("addBookBtn");
const closeBtn = document.getElementById("closeBtn");

//Listeners
newBookBtn.addEventListener("click", ()=>{
    newBookModal.showModal();
});

newBookRead.addEventListener("click",()=>{
    read = document.querySelector('input[name="read"]:checked').value;
})

addBookBtn.addEventListener("click", ()=>{
    if ( newBookTitle.checkValidity()& newBookAuthor.checkValidity() & newBookPages.checkValidity()){
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, read);
        newBookModal.close();
    }
}); 
closeBtn.addEventListener("click", ()=>{
    newBookModal.close();
});


//functions
function Book(title, author, pages, read="No") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

 /*    this.info = function(){
        let message = title + " by " + author + ", " + pages + " pages,";
        if(read){
            message = message + " already read."
        }else{
            message = message + " not read yet."
        }
        return message;
    } */
}

function addBookToLibrary(title, author, pages, read){
    book = new Book(title, author, pages, read)
    myLibrary.push(book);
    printBookCards();
    resetVariables();
};

function printBookCards() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML ="";

    myLibrary.forEach((book, id) => {
        let card = document.createElement("div");
        card.classList.add("card");
        Object.entries(book).forEach(([key, value]) =>{
            let titleH = document.createElement("h4");
            let title = document.createElement("p");
            titleH.innerText = key.toUpperCase() + ":";
            title.innerText = value;
            card.appendChild(titleH);
            card.appendChild(title);        
        }); 

        let btnRemove = document.createElement("button");
        btnRemove.classList.add("btn");
        btnRemove.innerText = "Remove";
        card.appendChild(btnRemove);

        btnRemove.addEventListener("click", ()=>{
                myLibrary.splice(id,1);
                printBookCards();} 
        );
        contenedor.appendChild(card);
    });
}

function resetVariables(){
    author = "";
    title = "";
    pages = "";
    read = false;
    newBookTitle.value = "";
    newBookAuthor.value ="";
    newBookPages.value ="";
    notRead.checked = true;
}

window.onload = printBookCards();
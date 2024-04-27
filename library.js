//Variables
const myLibrary = [];

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
}

Book.prototype.readStatus = function(){
    if(this.read == "No"){
        this.read = "Yes";
    }else if(this.read == "Yes"){
        this.read = "No";
    }
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
            let infoH = document.createElement("h4");
            let info = document.createElement("p");
            infoH.innerText = key.toUpperCase() + ":";
            if(key == "read"){
                info.classList.add("toggle-container");
                let inputToggle = document.createElement("input");
                inputToggle.setAttribute("type","checkbox");
                let sliderRound = document.createElement("div");
                sliderRound.classList.add("slider");
                sliderRound.classList.add("round");
                info.appendChild(inputToggle);
                info.appendChild(sliderRound);
                if(value=="Yes") inputToggle.checked=true;
                inputToggle.addEventListener("click", ()=>{
                    book.readStatus();
                });
            }else{
                info.innerText = value;
            } 
            card.appendChild(infoH);
            card.appendChild(info);        
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

//Initial books

book1 = new Book("Corazón tinieblas", "J Conrad", 300, "Yes")
book2 = new Book("Vagalume", "J Llamazares", 250, "No")
book3 = new Book("Imperio", "J Gallego", 290, "Yes")
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

window.onload = printBookCards();
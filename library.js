function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let message = title + " by " + author + ", " + pages + " pages,";
        if(read){
            message = message + " already read."
        }else{
            message = message + " not read yet."
        }
        return message;
    }
}
class Book {
    constructor(){
        this.year = 2020;
    }

    get year () {
        return this._year;
    }
    set year(val){
        this._year = val;
    }
}

let book = new Book()

console.log(book.year)
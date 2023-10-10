export type GetBooksResType = {
    totalItems : number
    items : Array<BookType>
}
export type GetBooksRequestType = {
    searchText : string 
    startIndex : number
    resultCount : number
    orderBy : string
    categories: string;
}
export type BookType = {
    id : string
    volumeInfo: {
        title: string
        authors : Array<string>
        description : string
        categories : Array<string>
        imageLinks : {
          smallThumbnail : string,
          thumbnail : string
        }
    }
}
import { instance } from "./api";
import { BookType, GetBooksRequestType, GetBooksResType } from "./types";

export const booksApi = {
    getBooksByTitle(params : GetBooksRequestType) {
      return instance.get<GetBooksResType>(`?q=${params.searchText}&key=AIzaSyDGwSfSSzdbvOWmSnAsjGB-T7eiCz39mR8&startIndex=${params.startIndex}&maxResults=${params.resultCount}&orderBy=${params.orderBy}`);
    },
    getCurrentBook(id : string){
      return instance.get<BookType>(`/${id}`);
    }
}




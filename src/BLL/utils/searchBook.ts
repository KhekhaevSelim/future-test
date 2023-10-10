import { GetBooksRequestType } from "../../DAL/types";
import { booksActions, booksThunk } from "../book.slice";
import { AppDispatch } from "../store";

export const searchBook = ( params : GetBooksRequestType, dispatch : AppDispatch ) => {

    if(params.searchText === "") return
    if(params.categories !== "All" && params.searchText !== ""){
      
        dispatch(booksActions.setSearchTitle({searchText : params.searchText}))
        dispatch(booksActions.setOrderBy({orderBy : params.orderBy}))
        dispatch(booksThunk.filteredBooks(params)).then(()=> {
            dispatch(booksActions.setResultStatus())
        })
    } else {
        dispatch(booksActions.setSearchTitle({searchText : params.searchText}))
        dispatch(booksActions.setOrderBy({orderBy : params.orderBy}))
        dispatch(booksThunk.getBooks(params)).then(()=> {
            dispatch(booksActions.setResultStatus())
        })
    }
}
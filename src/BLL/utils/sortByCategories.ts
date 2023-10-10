import { GetBooksRequestType } from "../../DAL/types";
import { booksActions, booksThunk } from "../book.slice";
import { AppDispatch } from "../store";

export const sortByCategories = ( params : GetBooksRequestType, dispatch : AppDispatch ) => {
    if(params.searchText === "") return
    dispatch(booksThunk.filteredBooks({
        categories : params.categories,
        searchText : params.searchText, 
        startIndex : params.startIndex,
        resultCount : params.resultCount, 
        orderBy : params.orderBy 
    })).then(()=> {
        dispatch(booksActions.setResultStatus())
    })
}
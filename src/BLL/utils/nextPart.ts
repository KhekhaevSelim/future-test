import { GetBooksRequestType } from "../../DAL/types";
import { booksActions, booksThunk } from "../book.slice";
import { AppDispatch } from "../store";

export const nextPart = ( params : GetBooksRequestType, dispatch : AppDispatch ) => {
    dispatch(booksActions.setStartIndex({startIndex : params.startIndex  + 30}))
    if(params.categories !== "All"){
        dispatch(booksThunk.filteredBooks(params))
    } else {
        dispatch(booksThunk.moreBooks(params))
    }
}
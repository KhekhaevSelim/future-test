import { useEffect } from "react";
import { booksActions } from "../../BLL/book.slice";
import { useAppDispatch, useAppSelector } from "../../BLL/hooks";
import { GetBooksRequestType } from "../../DAL/types";
import { SearchInput } from "../searchInput/SearchInput";
import { Selector } from "../selector/Selector";
import style from "./Header.module.css";
import { searchBook } from "../../BLL/utils/searchBook";
import { sortByCategories } from "../../BLL/utils/sortByCategories";

export const Header = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books)
    
    const searchBooks = (searchText : string,  startIndex : number , resultCount : number, orderBy : string, categories : string ) => {
        let params : GetBooksRequestType= {
            searchText ,
            startIndex ,
            resultCount,
            orderBy,
            categories
        }
        searchBook(params, dispatch)
    }

    const changeCategories = (value : string) => {
        dispatch(booksActions.setCategories({categories : value}))
    }

    useEffect(()=> {
        let params : GetBooksRequestType= {
            searchText : books.searchTitle,
            startIndex : books.startIndex,
            resultCount : books.resultCount,
            orderBy : books.orderBy,
            categories : books.categories
        }
        sortByCategories(params, dispatch)
    },[books.categories])


    const categories = [ "All" , "Art" , "Biography" , "Computers" , "History" , "Medical" , "Poetry"]
    const sort = ["relevance", "newest"]
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <SearchInput callBack={(value)=>searchBooks(value, books.startIndex,books.resultCount, books.orderBy, books.categories)}/>
                <div className={style.selectsContainer}>
                    <Selector name="categories" options={categories} callBack={(value)=>changeCategories(value)}/>
                    <Selector name="sort" options={sort} callBack={(value)=>{searchBooks(books.searchTitle, books.startIndex,books.resultCount, value, books.categories)}}/>
                </div>
            </div>
        </div>
    )
}
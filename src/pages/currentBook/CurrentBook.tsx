import { useLocation } from "react-router-dom";
import style from "./CurrentBook.module.css";
import {  useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../BLL/hooks";
import { booksThunk } from "../../BLL/book.slice";
import { Preloader } from "../../components/preloader/Preloader";


export const CurrentBook = () => { 
    const location = useLocation();
    const book = useAppSelector(state => state.books.currentBook);
    const dispatch = useAppDispatch();
    useLayoutEffect(()=> {
        dispatch(booksThunk.getCurrentBook(location.pathname.substring(1)))
    },[])
    
    return (
        book.id
        ?
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.imageContainer}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt="bookPreview" />
                </div>
                <div className={style.info}>
                    <span className={style.categories}>{book.volumeInfo.categories ? [...book.volumeInfo.categories] : ""}</span>
                    <span className={style.title}>{book.volumeInfo.title ? book.volumeInfo.title : "" }</span>
                    <span className={style.authors}>{book.volumeInfo.authors ? [...book.volumeInfo.authors] : ""}</span>
                    {
                        book.volumeInfo.description
                        ?
                    <div className={style.descriptionContainer}>
                        <span className={style.description}>{book.volumeInfo.description}</span>
                    </div>
                        :
                        ""
                    }
                    
                </div>
            </div>
        </div>
        :
        <div className={style.preloaderContainer}>
            <Preloader/>
        </div>
        
        
    )
}
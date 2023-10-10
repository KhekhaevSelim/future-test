import { useAppDispatch, useAppSelector } from "../../BLL/hooks";
import { nextPart } from "../../BLL/utils/nextPart";
import { GetBooksRequestType } from "../../DAL/types";
import style from "./Btn.module.css";

type BtnPropsType = {
    totalItems : number 
}

export const Btn = (props : BtnPropsType) => {
    
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books)
  
    const next = (searchText : string , resultCount : number,orderBy : string, categories : string ) => {
        let params : GetBooksRequestType= {
            searchText ,
            startIndex : books.startIndex + 30,
            resultCount,
            orderBy,
            categories
        }
        nextPart(params,dispatch)
       
    }

    return (
        <div className={style.container}>
            {props.totalItems > 30
            ?
            <button className={style.btn} onClick={()=>next(books.searchTitle, books.resultCount, books.orderBy, books.categories)}>показать еще</button>
            :
            ""
            }
        </div>
    )
}
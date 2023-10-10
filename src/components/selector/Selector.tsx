
import { booksActions } from "../../BLL/book.slice";
import { useAppDispatch } from "../../BLL/hooks";
import style from "./Selector.module.css";

type SelectorPropsType = {
    options : Array<string>
    name : string
    callBack : (value : string) => void
}

export const Selector = (props : SelectorPropsType) => {

    const dispatch = useAppDispatch();

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.name === "sort"){
            dispatch(booksActions.setOrderBy({ orderBy : e.target.value}))
        } else {
            dispatch(booksActions.setCategories({ categories : e.target.value}))
        }
        props.callBack(e.target.value)
    }

    return (
        <div  className={style.wrapper}>
        <label htmlFor={props.name} className={style.label}>{props.name}:</label>
        <select name={props.name} id={props.name} className={style.container} onChange={(e)=>handleChange(e)}>
            {
                props.options.map((o,i) => {
                    return (
                        <option value={o} key={i} className={style.option}>{o}</option>
                    )
                })
            }
        </select>
        </div>
    )
}
import { ChangeEvent, useState } from "react";
import style from "./SearchInput.module.css";

type SearchInputPropsType = {
    callBack : (value : string) => void
}

export const SearchInput = (props : SearchInputPropsType) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    
    const searchBooks = (value: string) => {
        props.callBack(value)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.callBack(value)
        }
      };

    return (
        <label htmlFor="searchInput">
            <input type="text" tabIndex={1} value={value} onChange={(e)=>handleChange(e)} placeholder="Введите название" onKeyPress={(e)=>handleKeyPress(e)}/>
            <i className='bx bx-search-alt-2' id={style.icon} onClick={()=>searchBooks(value)}></i>
        </label>
    )
}
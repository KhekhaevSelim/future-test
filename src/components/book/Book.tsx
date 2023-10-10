import style from "./Book.module.css";


type BookPropsType = {
    id : string
    title: string
    authors : Array<string>
    categories : Array<string>
    smallThumbnail : string
    callBack : (id : string) => void
}

export const Book = (props : BookPropsType) => {



    const mappedAuthors = (authors : Array<string>) : string | Array<string> => {
        let renderAuthors : string | Array<string> ;
        authors.length > 1 
        ?
        renderAuthors = authors.map((el, i, arr) => { 
            return i !== arr.length - 1 ? el + ", " : el;
         })
        :
        renderAuthors = authors[0];
        return renderAuthors;
    }

    return (
        <div className={style.container} onClick={()=>{props.callBack(props.id)}}>
            {props.smallThumbnail 
            ? 
            <img src={props.smallThumbnail } alt="bookImage" loading="lazy" className={style.image}/>
            :
            <span className={style.emptyImage}></span>
            }
            <div className={style.info}>
                <span className={style.categories}>{props.categories ? props.categories[0] : ""}</span>
                <span className={style.title}>{props.title ? props.title : ""}</span>
                {props.authors 
                ? 
                <span className={style.authors}>{mappedAuthors(props.authors)}</span>
                :
                ""
                }
                
            </div>
            
        </div>
    )
}
import { useAppSelector } from '../../BLL/hooks';
import { Header } from '../../components/header/Header';
import style from "./Search.module.css";
import { Book } from '../../components/book/Book';
import { Preloader } from '../../components/preloader/Preloader';
import { Btn } from '../../components/btn/Btn';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Notify } from '../../components/notify/Notify';


export const Search = () => {
  const books = useAppSelector(state => state.books);
  const app = useAppSelector(state => state.app)
  const navigate = useNavigate();

  const redirect = (id : string) => {
    navigate(`/${id}`)
  }

  useEffect(()=> {
    if(app.isLoading === true){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [app.isLoading])
  return (
    <div className={style.search} >
    {app.error && <Notify error={app.error}/>}
    <Header/>
    {
      books.totalItems 
      ?
      <span className={style.resultCount}>
        количество найденных книг :<b>{books.totalItems}</b>
      </span>
      :
      ""
    }
    {
      app.isLoading 
      ?
      <Preloader/>
       :
      ""
    }
    {books.items?.length ? 
    <section className={app.isLoading ? style.bluredContent : style.content}>
      <div className={style.wrapper}>
        {books.items.map(el => {
          return (
            <Book key={el.id} authors={el.volumeInfo.authors} 
                  categories={el.volumeInfo.categories}
                  id={el.id} title={el.volumeInfo.title}
                  smallThumbnail={el.volumeInfo.imageLinks?.smallThumbnail} 
                  callBack={(id)=>redirect(id)}/>
          )
        })}
        </div>
    </section> 
   :
   ""
  }
   <span className={style.notFound}>{books.resultStatus}</span>
   
    <Btn totalItems={books.totalItems}/>
  </div>
    
  )
}

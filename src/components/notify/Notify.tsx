import { useEffect, useState } from "react";
import style from "./Notify.module.css";

type ErrorPropsType = {
    error : string
}

export const Notify = (props : ErrorPropsType) => {
    const [scrollY, setScrollY] = useState<number>(window.scrollY)
    let halfInnerHeight = (window.innerHeight + 15) - window.innerHeight;
    useEffect(()=> {
      const handleScroll = () => {
        setScrollY(window.pageYOffset);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
      
    },[window.scrollY])
    return (
        <div className={style.container} style={{top : `${halfInnerHeight + scrollY}px`}}>
            <span className={style.error}>{props.error}</span>
        </div>
    )
}
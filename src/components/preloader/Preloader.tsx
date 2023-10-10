
import { useEffect, useState } from "react";
import style from "./Preloader.module.css";



export const Preloader = () => {
    
    const [scrollY, setScrollY] = useState<number>(window.scrollY)
    let halfInnerHeight = window.innerHeight / 2 - 100;
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
            <span className={style.preloader} style={{top : `${halfInnerHeight + scrollY}px`}}></span>      
    )
}
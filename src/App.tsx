import { Route, Routes } from "react-router-dom"
import { Search } from "./pages/search/Search"
import { CurrentBook } from "./pages/currentBook/CurrentBook"





export const App = () => {

  return (
    <> 
      <Routes>
      <Route path={"/"} element={<Search/>}/>
      <Route path={"/:bookId"} element={<CurrentBook/>}/>
      </Routes>
    </>
    
  )
}




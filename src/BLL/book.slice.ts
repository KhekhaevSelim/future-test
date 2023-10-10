import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookType, GetBooksRequestType, GetBooksResType } from "../DAL/types";
import { createAppAsyncThunk } from "./utils/createAppAsyncThunk";
import { thunkTryCatch } from "./utils/thunkTryCatch";
import { booksApi } from "../DAL/booksApi";



const booksInitialState = {
    totalItems : 0 as number ,
    items : [] as Array<BookType>,
    searchTitle : "" as string, 
    startIndex : 0 as number,
    resultCount : 30 as number,
    categories : "All" as string,
    orderBy : "relevance" as string,
    resultStatus : "" as string,
    currentBook : {} as BookType
}

const slice = createSlice({
    name : "books",
    initialState : booksInitialState,
    reducers : {
        setSearchTitle : (state,action : PayloadAction<{searchText : string}>) => {
            state.searchTitle = action.payload.searchText
          },
        setStartIndex : (state,action : PayloadAction<{startIndex : number}>) => {
            state.startIndex = action.payload.startIndex
          },
        setOrderBy : (state,action : PayloadAction<{orderBy : string}>) => {
            state.orderBy = action.payload.orderBy
          },
        setCategories : (state,action : PayloadAction<{categories : string}>) => {
            state.categories = action.payload.categories
          },  
        setResultStatus : (state) => {
            state.resultStatus = state.totalItems === 0 ? "ничего не найдено" : ""
          },  
    },
    extraReducers : builder => {
        builder.addCase(getBooks.fulfilled, (state, action) => {  
          
            return {
                ...state,
                startIndex : 0, 
                totalItems : action.payload.totalItems,
                items : action.payload.items,
            }
        }),
        builder.addCase(moreBooks.fulfilled, (state, action) => {  
            return {
                ...state,
                totalItems : action.payload.totalItems,
                items : [...state.items, ...action.payload.items],
            }
        })
        builder.addCase(filteredBooks.fulfilled, (state, action) => {
            return {
                ...state,
                totalItems : action.payload.totalItems,
                items : action.payload.items
            }
        }),
        builder.addCase(getCurrentBook.fulfilled, (state, action) => {
          let book = {
            id : action.payload.id,
            volumeInfo : action.payload.volumeInfo
          }
          return {
              ...state,
              currentBook : book
          }
      })
    },
})



// thunks

const getBooks = createAppAsyncThunk <GetBooksResType, GetBooksRequestType>
("getBooks", async (arg, thunkAPI) => {
 return  thunkTryCatch(thunkAPI, async ()=> {
   const res = await booksApi.getBooksByTitle(arg);
   return res.data;
  })
});


const moreBooks = createAppAsyncThunk <GetBooksResType, GetBooksRequestType>
("moreBooks", async (arg, thunkAPI) => {
 return  thunkTryCatch(thunkAPI, async ()=> {
   const res = await booksApi.getBooksByTitle(arg);
   return res.data;
  })
});


const filteredBooks = createAppAsyncThunk <GetBooksResType, GetBooksRequestType>
("filteredBooks", async (arg, thunkAPI) => {
 return  thunkTryCatch(thunkAPI, async ()=> {
   const res = await booksApi.getBooksByTitle(arg);
    if(arg.categories === "All") {
        return {
            totalItems : res.data.totalItems,
            items : res.data.items
           }
    }
   let filteredItems = res.data.items.filter(i => i.volumeInfo.categories ? i.volumeInfo.categories.includes(arg.categories) : "" );
   return {
    totalItems : filteredItems.length,
    items : filteredItems
   }
  })
});


const getCurrentBook = createAppAsyncThunk <BookType, string>
("getCurrentBook", async (arg, thunkAPI) => {
 return  thunkTryCatch(thunkAPI, async ()=> {
   const res = await booksApi.getCurrentBook(arg);
   return res.data
  })
});

export const booksReducer = slice.reducer;
export const booksThunk = { getBooks, moreBooks, filteredBooks, getCurrentBook };
export const booksActions = slice.actions;
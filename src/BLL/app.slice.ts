import { createSlice } from "@reduxjs/toolkit"
import { AxiosError, isAxiosError } from "axios"

const appInitialState = {
    error: null as string | null,
    isLoading: false,
  }

const slice = createSlice({
    name : "app",
    initialState : appInitialState,
    reducers : {
       
     },
     extraReducers : (builder) => {
        builder.addMatcher(
            (action) => {return action.type.endsWith("/pending")},
            (state) => {
                 state.isLoading = true 
                 state.error = null
            } 
        ),
        builder.addMatcher(
            (action) => {return action.type.endsWith("/rejected")},
            (state, action) => { 
                const err = action.payload as Error | AxiosError<{ error : string }>
                if(isAxiosError(err)){
                    state.error = err.response ? err.response.data.error.message : err.message
                  } else {
                    alert(`aaaa ${err}`)
                    state.error = `native error ${err.message}`
                  }
                  state.isLoading = false
             }
        ),
        builder.addMatcher(
            (action) => { return action.type.endsWith("/fulfilled") },
            (state) => {
                state.isLoading = false
            }
        )
        
     }
})


export const appReducer = slice.reducer;
export const appActions = slice.actions;
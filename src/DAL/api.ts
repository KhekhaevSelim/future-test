import axios from "axios";

export const instance = axios.create({
    baseURL : "https://www.googleapis.com/books/v1/volumes",
})




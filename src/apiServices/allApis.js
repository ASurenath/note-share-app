import { commonApi } from "./commonApi";
import { SERVER_URL } from "./serverUrl";

///Register API
export const registerApi=async(userData)=>{
    return await commonApi("POST",`${SERVER_URL}/register`,userData,'')
}
///Login API
export const loginApi=async(loginData)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,loginData,'')
}

///Add Note API
export const addNoteApi=async(noteData,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/notes`,noteData,reqHeader)
}

///get all notes  API
export const getAllNotesApi=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/notes`,'',reqHeader)
}

///get my notes  API
export const getMyNotesApi=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/my-notes`,'',reqHeader)
}

///edit note API
export const editNoteApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/notes`,reqBody,reqHeader)
}

///edit note API
export const deleteNoteApi=async(reqBody,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/notes`,reqBody,reqHeader)
}

//getUserDataApi
export const getUserDataApi=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/user`,'',reqHeader)
}

//add to fav
export const addToFavApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/add-fav`,reqBody,reqHeader)
}
//removeFrom fav
export const removeFromFavApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/remove-fav`,reqBody,reqHeader)
}

//changePasswordApi
export const changePasswordApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/password`,reqBody,reqHeader)
}

//deleteUserAPI
export const deleteUserApi=async(reqBody,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/delete-user`,reqBody,reqHeader)
}

//updateUserAPI
export const editUserApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}
import {createAsyncThunk} from "@reduxjs/toolkit";
import {UsersService} from "../../../services";

const FetchUsersThunk=createAsyncThunk('getUserThunk',async (_,{rejectWithValue})=>{
    try{
        const response=await UsersService.getAll()
        return response.data
    }catch (e){
        return rejectWithValue(e);
    }
})

export default FetchUsersThunk

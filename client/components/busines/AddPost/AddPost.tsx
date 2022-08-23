import {LoadingOutlined, PaperClipOutlined, SendOutlined} from "@ant-design/icons";
import {useForm} from "react-hook-form";
import {useTypedDispatch} from "../../../hooks";
import AddPostDto from "../../../types/dto/AddPost.dto";
import React, {useState} from "react";
import styles from './AddPost.module.scss'
import {AddPostThunk} from "../../../store/thunks/posts";

const AddPost=()=>{

    const dispatch=useTypedDispatch()
    const [isLoading,setLoading]=useState(false)
    const {register,reset,formState:{errors},handleSubmit}=useForm<AddPostDto>({mode:'onSubmit'})
    const inputRef=React.useRef<HTMLInputElement>(null)

    const sendPost=async (dto:AddPostDto)=>{
        setLoading(true);
        await dispatch(AddPostThunk(dto))
        setLoading(false)
        reset()
    }

    return(
        <form className={styles.AddPost} onSubmit={handleSubmit(sendPost)}>
            <input className={errors.text && styles.Bad} {...register('text',{required:true,maxLength:512})} placeholder={'Your text...'}/>
            <label className={styles.File} htmlFor="file-upload">
                <PaperClipOutlined ></PaperClipOutlined>
                <input id="file-upload" accept="image/png, image/jpeg" type='file' {...register('picture',{})}/>
            </label>
            <button type={"submit"}>{!isLoading?<SendOutlined />:<LoadingOutlined />}</button>
        </form>
    )
}

export default AddPost
import {LoadingOutlined, SendOutlined} from "@ant-design/icons";
import {useForm} from "react-hook-form";
import {useTypedDispatch} from "../../../hooks";
import AddPostDto from "../../../types/dto/AddPost.dto";
import {useState} from "react";
import styles from './AddPost.module.scss'
import {AddPostThunk} from "../../../store/thunks/posts";

const AddPost=()=>{

    const dispatch=useTypedDispatch()
    const [isLoading,setLoading]=useState(false)
    const {register,formState:{errors},handleSubmit}=useForm<AddPostDto>({mode:'onSubmit'})

    const sendPost=async (dto:AddPostDto)=>{
        setLoading(true);
        await dispatch(AddPostThunk(dto))
        setLoading(false)
    }

    return(
        <form className={styles.AddPost} onSubmit={handleSubmit(sendPost)}>
            <input className={errors.text && styles.Bad} {...register('text',{required:true,maxLength:256})} placeholder={'Your text...'}/>
            <button type={"submit"}>{!isLoading?<SendOutlined size={50}/>:<LoadingOutlined />}</button>
        </form>
    )
}

export default AddPost
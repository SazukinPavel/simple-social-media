import {FormInput, LoadingButton, ModalWindow} from "../../ui";
import React from "react";
import {ModalWindowProps} from "../../ui/ModalWindow/ModalWindow";
import styles from './EditPostModal.module.scss'
import { Post } from "../../../types";
import { useForm } from "react-hook-form";
import UpdatePostDto from "../../../types/dto/UpdatePost.dto";
import { useLoading, useTypedDispatch } from "../../../hooks";
import { UpdatePostThunk } from "../../../store/thunks/posts";

interface EditPostModalProps extends ModalWindowProps{
    post:Post
}


const EditPostModal:React.FC<EditPostModalProps>=({post,...props})=>{
    
    const dispatch=useTypedDispatch()
    const [isLoadingUpdate,toggleLoadingUpdate]=useLoading()
    const {register,formState,handleSubmit}=useForm<UpdatePostDto>({mode:'onSubmit'})

    const updatePost=async(dto:UpdatePostDto)=>{
        toggleLoadingUpdate()
        await dispatch(UpdatePostThunk({...dto,postId:post._id}))
        toggleLoadingUpdate()
    }

    return(
        <ModalWindow {...props} isOpen={props.isOpen} className={styles.EditPostModal}>
            <h3>Edit your post</h3>
            <form className={styles.Form} onSubmit={handleSubmit(updatePost)}>
                <FormInput
                    registerFunc={()=>register('text',{
                        value:post.text,
                        required:'Text is required',
                        maxLength:{value:25,message:'Maximum length 215 characters'}})
                    }
                    text={'Text:'}
                    placeholder={'Enter your text'}
                    isError={!!formState.errors.text}
                    errorMessage={formState.errors.text?.message}
                />
                <div className={styles.Buttons}>
                    <LoadingButton isLoading={isLoadingUpdate} styleType='black'>Update</LoadingButton>
                </div>
            </form>
        </ModalWindow>
    )
}

export default EditPostModal
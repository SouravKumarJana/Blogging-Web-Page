import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".."
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({      //watch: provide the capability of continous monitoring form of React-Hook-Form ; setValue : use to set any value at Form ; getValue : use to grab the value from Form ; comtrol : Here take the contrl of RTE
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit= async (data) =>{
        if(post) {                                                   //***if any of your  post is exist **** */
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null;    //upload the new file
            
            if(file){
                service.deleteFile(post.featuredimage)                               //delete the old post (actually post.featureimage is the id of old file)
            }
            const dbPost= await service.updatePost(post.$id,{                        //Now , update the post with new uploadded file
                ...data,
                featuredimage: file ? file.$id : undefined,
                
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            })
        }
        else{                                                   //*****if any of your post is not exist *** ** */
            const file = await service.uploadFile(data.image[0]);     //upload a file
            if(file){
                const fileId = file.$id
                data.featuredimage=fileId
                
                const dbPost = await service.createPost({           //create the post using userid and imageid
                    ...data,
                    userid : userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) =>{
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")      //when space come at the value , replace space with "-"
            .replace(/\s/g, "-");
        }
    },[])

    React.useEffect(()=>{
        const subscription= watch((value, {name})=>{           //Here "watch" continously monitoring the input field which register field is "title"               
            if (name==="title"){
                setValue('slug', slugTransform(value.title , {shouldValidate: true}))       //set at slug , the value of slugTranform
            }
        })
        return ()=>{
            subscription.unsubscribe()       //for optimization the the useEffect() ... if you dont unsubscribe the the subscribe then the looping will be continue again and again 
        }
    },[watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full hover:bg-red-500" >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

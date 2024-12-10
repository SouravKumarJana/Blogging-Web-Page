import React, {useEffect, useState} from "react";
import {Container , PostForm} from "../components/index"
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [post, setPost] = useState(null)
    const {slug} = useParams()                //when you click at edit button then you gets a post link (url) of this post, And we know that to fetch the data from url we use useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(slug) {
            service.getPost(slug).then((post) =>{
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate("/")
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost;
import React from "react";
import service from "../appwrite/config";
import {Link} from "react-router-dom"

function PostCard({$id ,title, featuredimage}) {    // $id -> it is syntax of appwrite
    return (
        <Link to={`/post/${$id}`}>                                  {/*actually Link provide facility of clicked and it follow the path */}
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img 
                        src={service.getFilePreview(featuredimage)} alt={title}     //$id : is id of post  And  featuredImage: is id of image
                        className="rounded-xl"
                    />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;
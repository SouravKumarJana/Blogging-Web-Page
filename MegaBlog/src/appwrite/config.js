import conf from "../conf/conf.js"
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userid}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,                  //dataBase id
                conf.appwriteCollectionId,                //collection id
                slug,                                     //Here slug is as work document id
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createpost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
           console.log("Appwrite service :: deletePost :: error", error);
           return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(         //acess a single document
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(        //it acess all the documents (post)
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status" , "active")]          //status(index) is key & active is value of status key
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uplodeFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;                                                  //if file is successfully deleted then return true
        } catch (error) {
            console.log("Appwrite service :: uplodeFile :: error", error);
            return false;                                                    //if file is notvsuccessfully deleted then return false
        }
    }

    getFilePreview(fileId){                               // Here, no async-await is nedded , it is enough fast process
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service=new Service()
export default service;

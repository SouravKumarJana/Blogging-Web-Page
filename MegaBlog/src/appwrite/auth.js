import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);    
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){                                                                     //if userAccount is successfully created then do login 
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
            
        } catch (error) {
            throw error;
            
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){               // check you are already login or not
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;                     //if response (promise) cant reach to try-catch block then return null // you can also handle it using if-else block
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error" , error);        
        }
    }
}

const authService = new AuthService();

export default authService ;             //Here export Object of Authservice ..we export object because it very easy to acess data and method from object of a class
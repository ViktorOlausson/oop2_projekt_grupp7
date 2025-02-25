import { Client, ID, Account } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, username}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        } catch{
            throw error
        }
        return null
    }

    async logout(){
        try{
            await this.account.deleteSession("current")
        }catch (error){
            throw error
        }
    }
}

const authService = new AuthService()

export default authService
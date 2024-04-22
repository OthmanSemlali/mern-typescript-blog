import mongoose, {Schema} from "mongoose";



export type IPost =  {
    title: string;
    content: string;
    seoContent:string;
    readTime:string;
    tags:string[];
    image: string;
    userID: Schema.Types.ObjectId;
    categoryID: Schema.Types.ObjectId;
    sanitizedHtml:string
}

export type IPostWithoutContent = Omit<IPost, 'content'>



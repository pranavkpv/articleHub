import { addArticle, editArticle, likeData } from "../../../domain/entities/article";
import { articleDB } from "../../db/model/article";
import { blockDB } from "../../db/model/block";
import { disLikeDB } from "../../db/model/dislike";
import { likeDB } from "../../db/model/like";
import { IArticleRepository } from "../interface/IArticleRepository";

export class ArticleRepository implements IArticleRepository {
    async saveArticle(data: addArticle): Promise<void> {
        const newArticle = new articleDB(data)
        await newArticle.save()
    }
    async likeArticle(data: likeData): Promise<void> {
        const newLike = new likeDB(data)
        await newLike.save()
    }
    async disLikeArticle(data: likeData): Promise<void> {
        const newDisLike = new disLikeDB(data)
        await newDisLike.save()
    }
    async blockArticle(data: likeData): Promise<void> {
        const newBlock = new blockDB(data)
        await newBlock.save()
    }
    async editArticle(data: editArticle): Promise<void> {
        const {_id,category,description,image,tags,title} = data
        await articleDB.findByIdAndUpdate(_id,{category,description,image,tags,title})
    }
    async deleteArticle(id: string): Promise<void> {
        await articleDB.findByIdAndUpdate(id,{deletedStatus:true})
    }
}
export interface IArticleModelEntity {
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   createdBy: string,
   deletedStatus:boolean
   createdAt: Date,
   updatedAt: Date,
}
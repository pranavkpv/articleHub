export interface IArticleModelEntity {
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   createdBy: string,
   createdAt: Date,
   updatedAt: Date,
}
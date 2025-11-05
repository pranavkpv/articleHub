export interface addArticle {
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   createdBy: string,
}

export interface likeData {
   userId: string
   articleId: string
}

export interface editArticle {
   _id:string
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
}
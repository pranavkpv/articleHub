export interface getPreferenceBaseArticleData {
   _id:string
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   like: string[],
   dislike: string[]
   block: string[]
   username:string
}

export interface getUserBaseArticleData {
   _id:string
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   like: string[],//username
   dislike: string[]//username
   block: string[]//username
}

export interface addArticleData {
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
}

export interface updateArticleData extends addArticleData {
   _id?:string
}


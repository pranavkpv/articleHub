import { Token } from "../../application/services/implementation/Token";
import { ArticleSaveUsecase } from "../../application/usecases/implementation/ArticleSaveUsecase";
import { DislikeArticleUseCase } from "../../application/usecases/implementation/DislikeArticleUseCase";
import { LikeArticleUseCase } from "../../application/usecases/implementation/LikeArticleUseCase";
import { ArticleController } from "../../presentation/controllers/implementation/Article.controller";
import { ArticleRepository } from "../repositories/implementation/ArticleRepository";

const articleRepository = new ArticleRepository()
const saveArticleUsecase = new ArticleSaveUsecase(articleRepository)
const tokenservice = new Token()
const likeArticleUseCase = new LikeArticleUseCase(articleRepository)
const dislikeArticleUseCase = new DislikeArticleUseCase(articleRepository)
export const injectedArticleController = new ArticleController(saveArticleUsecase,tokenservice,likeArticleUseCase,dislikeArticleUseCase)
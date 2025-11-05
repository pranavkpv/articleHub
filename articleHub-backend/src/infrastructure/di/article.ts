import { Token } from "../../application/services/implementation/Token";
import { ArticleSaveUsecase } from "../../application/usecases/implementation/ArticleSaveUsecase";
import { BlockArticleUseCase } from "../../application/usecases/implementation/BlockArticleUseCase";
import { DeleteArticleUsecase } from "../../application/usecases/implementation/DeleteArticleUsecase";
import { DislikeArticleUseCase } from "../../application/usecases/implementation/DislikeArticleUseCase";
import { EditArtcleUseCase } from "../../application/usecases/implementation/EditArticleUseCase";
import { LikeArticleUseCase } from "../../application/usecases/implementation/LikeArticleUseCase";
import { ArticleController } from "../../presentation/controllers/implementation/Article.controller";
import { ArticleRepository } from "../repositories/implementation/ArticleRepository";

const articleRepository = new ArticleRepository()
const saveArticleUsecase = new ArticleSaveUsecase(articleRepository)
const tokenservice = new Token()
const likeArticleUseCase = new LikeArticleUseCase(articleRepository)
const dislikeArticleUseCase = new DislikeArticleUseCase(articleRepository)
const blockArticleUseCase = new BlockArticleUseCase(articleRepository)
const editArticleUseCase = new EditArtcleUseCase(articleRepository)
const deleteArticleUseCase = new DeleteArticleUsecase(articleRepository)
export const injectedArticleController = new ArticleController(saveArticleUsecase, tokenservice, likeArticleUseCase, dislikeArticleUseCase,
   blockArticleUseCase, editArticleUseCase, deleteArticleUseCase)
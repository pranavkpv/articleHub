import { Token } from "../../application/services/implementation/Token";
import { ArticleSaveUsecase } from "../../application/usecases/implementation/ArticleSaveUsecase";
import { BlockArticleUseCase } from "../../application/usecases/implementation/BlockArticleUseCase";
import { DeleteArticleUsecase } from "../../application/usecases/implementation/DeleteArticleUsecase";
import { DislikeArticleUseCase } from "../../application/usecases/implementation/DislikeArticleUseCase";
import { EditArtcleUseCase } from "../../application/usecases/implementation/EditArticleUseCase";
import { GetPreferenceBaseArticleUsecase } from "../../application/usecases/implementation/GetPreferenceBaseArticleUsecase";
import { GetUserBaseArticleUseCase } from "../../application/usecases/implementation/GetUserBaseArticleUseCase";
import { LikeArticleUseCase } from "../../application/usecases/implementation/LikeArticleUseCase";
import { ArticleController } from "../../presentation/controllers/implementation/Article.controller";
import { ArticleMapper } from "../mappers/implements/ArticleMapper";
import { ArticleRepository } from "../repositories/implementation/ArticleRepository";
import { UserRepository } from "../repositories/implementation/UserRepository";

const articleRepository = new ArticleRepository()
const userRepository = new UserRepository()
const articlemapper = new ArticleMapper()
const saveArticleUsecase = new ArticleSaveUsecase(articleRepository)
const tokenservice = new Token()
const likeArticleUseCase = new LikeArticleUseCase(articleRepository)
const dislikeArticleUseCase = new DislikeArticleUseCase(articleRepository)
const blockArticleUseCase = new BlockArticleUseCase(articleRepository)
const editArticleUseCase = new EditArtcleUseCase(articleRepository)
const deleteArticleUseCase = new DeleteArticleUsecase(articleRepository)
const getUserBaseArticleUseCase = new GetUserBaseArticleUseCase(articleRepository,articlemapper)
const getPreferenceBaseArticleUseCase = new GetPreferenceBaseArticleUsecase(userRepository,articleRepository,articlemapper,)
export const injectedArticleController = new ArticleController(saveArticleUsecase, tokenservice, likeArticleUseCase, dislikeArticleUseCase,
   blockArticleUseCase, editArticleUseCase, deleteArticleUseCase,getUserBaseArticleUseCase,getPreferenceBaseArticleUseCase)
import { ListCategoryUseCase } from "../../application/usecases/implementation/ListCategoryUseCase";
import { CategoryController } from "../../presentation/controllers/implementation/Category.controller";
import { CategoryRepository } from "../repositories/implementation/CategoryRepository";

const categoryRepository = new CategoryRepository()
const listCategoryUseCase = new ListCategoryUseCase(categoryRepository)
export const injectedCategoryController = new CategoryController(listCategoryUseCase)
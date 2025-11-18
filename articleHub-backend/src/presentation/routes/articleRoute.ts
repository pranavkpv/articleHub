import { Router } from 'express';
import { injectedArticleController } from '../../infrastructure/di/article';
import { validateArticle } from '../middleware/validations/article';

export class articleRoute {
   public articleRoute: Router;
   constructor() {
      this.articleRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.articleRoute.post(
         '/add',
         validateArticle,
         injectedArticleController.addArticle
      );
      this.articleRoute.post(
         '/like',
         injectedArticleController.likeArticle
      );
      this.articleRoute.post(
         '/dislike',
         injectedArticleController.dislikeArticle
      );
      this.articleRoute.post(
         '/block',
         injectedArticleController.blockArticle
      );
      this.articleRoute.put(
         '/edit/:id',
         validateArticle,
         injectedArticleController.editArticle
      );
      this.articleRoute.patch(
         '/delete/:id',
         injectedArticleController.deleteArticle
      );
      this.articleRoute.get(
         '/user-article',
         injectedArticleController.getUserBaseArticle
      );
      this.articleRoute.get(
         '/all-article',
         injectedArticleController.getPreferenceBaseArticle
      );
   }
}
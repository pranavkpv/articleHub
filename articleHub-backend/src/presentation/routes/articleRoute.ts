import { Router } from 'express';
import { injectedArticleController } from '../../infrastructure/di/article';

export class articleRoute {
   public articleRoute: Router;
   constructor() {
      this.articleRoute = Router();
      this.setRoute();
   }
   private setRoute() {
      this.articleRoute.post(
         '/add',
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
         injectedArticleController.editArticle
      );
       this.articleRoute.patch(
         '/delete/:id',
         injectedArticleController.deleteArticle
      );
   }
}
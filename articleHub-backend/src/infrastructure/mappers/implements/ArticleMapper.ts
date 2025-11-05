import { likeAggregateUser } from "../../../domain/entities/article";
import { IArticleMapper } from "../interfaces/IArticleMapper";

export class ArticleMapper implements IArticleMapper {
   toUsernamefromAction(data: likeAggregateUser[]): string[] {
      return data.map((element) => {
         return element.userDetails.firstname + element.userDetails.lastname
      })
   }
}
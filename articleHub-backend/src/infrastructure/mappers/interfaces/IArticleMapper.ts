import {  likeAggregateUser } from "../../../domain/entities/article";

export interface IArticleMapper {
  toUsernamefromAction(data:likeAggregateUser[]):string[]
}
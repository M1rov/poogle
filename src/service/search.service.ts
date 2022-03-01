import $api from '../API/index'
import {webSearchResp} from "../interfaces/webSearch";
import {imageSearchResp} from "../interfaces/imageSearch";


export default class SearchService {
  static async webSearch(query: string, page: number = 1, size: number = 10): Promise<webSearchResp> {
    return (await $api.get(`/Search/WebSearchAPI`,
      {params: {q: query, pageNumber: page, pageSize: size, autoCorrect: true}})).data
  }

  static async imageSearch(query: string, page: number = 1, size: number = 10): Promise<imageSearchResp> {
    return (await $api.get(`/Search/ImageSearchAPI`,
      {params: {q: query, pageNumber: page, pageSize: size, autoCorrect: true}})).data
  }
}
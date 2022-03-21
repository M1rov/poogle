import SearchService from "../service/search.service";

export default class SearchController {
  static async webSearch(query: string, page?: number, size?: number) {
    return await SearchService.webSearch(query, page, size);
  }

  static async imageSearch(query: string, page?: number, size?: number) {
    return await SearchService.imageSearch(query, page, size);
  }
}
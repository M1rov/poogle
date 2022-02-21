import $api from '../API/index'

interface SearchResult {
  id: string,
  title: string,
  url: string,
  description: string,
  body: string,
  snippet: string,
  keywords: string,
  language: string,
  isSafe: boolean,
  datePublished: string,
  image: object
}

export interface SearchResp {
  totalCount: number,
  relatedSearch: string[],
  value: SearchResult[],
}

export default class SearchService {
  static async webSearch(query: string, page: number = 1, size: number = 10): Promise<SearchResp> {
    return (await $api.get(`/Search/WebSearchAPI`,
      {params: {q: query, pageNumber: page, pageSize: size}})).data
  }
}
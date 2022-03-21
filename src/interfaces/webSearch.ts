export interface webSearchResult {
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
  image: {
    url: string
  }
}

export interface webSearchResp {
  totalCount: number,
  relatedSearch: string[],
  value: webSearchResult[],
}
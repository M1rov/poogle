export interface imageSearchResult {
  title: string,
  url: string,
  height: number,
  width: number,
  thumbnail: string,
  thumbnailHeight: number,
  thumbnailWidth: number,
  webpageUrl: string
}

export interface imageSearchResp {
  totalCount: number,
  value: imageSearchResult[],
}
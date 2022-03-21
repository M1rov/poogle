export function truncateText(text: string, limit: number = 125): string {
  text = text.trim();
  if (text.length <= limit) return text;

  text = text.slice(0, limit);
  text = text.slice(0, text.lastIndexOf(' '));

  return text.trim() + '...';
}

export const truncateURI = (URI: string): string => URI.slice(0, URI.indexOf('/', 8))
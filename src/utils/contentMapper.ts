import { ContentItem } from '@/api/types';

export const mapContentToObject = (content: ContentItem[]) => {
  return content.reduce((acc, item) => {
    acc[item.id] = item.value;
    return acc;
  }, {} as Record<string, string | number>);
}; 
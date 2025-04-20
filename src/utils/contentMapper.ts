import { ContentItem } from '@/api/types';

export const mapContentToObject = (content: ContentItem[]) => {
  return content.reduce((acc, item) => {
    if (item.id === 'name') {
      acc.label = item.value;
    }
    if (item.id === 'Маркер' && item.options) {
      acc.options = item.options;    
      acc.label = item.id  
    }
    acc.value = item.value;
    return acc;
  }, {} as any);
}; 
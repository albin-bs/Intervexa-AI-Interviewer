import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useOptimizedSearch(items, searchKeys = ['title', 'name']) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    
    const query = debouncedQuery.toLowerCase();
    return items.filter(item => {
      return searchKeys.some(key => 
        item[key]?.toLowerCase().includes(query)
      );
    });
  }, [items, debouncedQuery, searchKeys]);
  
  return { searchQuery, setSearchQuery, filteredItems };
}

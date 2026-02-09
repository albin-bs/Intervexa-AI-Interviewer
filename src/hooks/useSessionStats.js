import { useMemo } from 'react';

export function useSessionStats(sessions) {
  return useMemo(() => {
    if (!sessions || sessions.length === 0) {
      return { total: 0, average: 0, passed: 0, passRate: 0 };
    }
    
    const total = sessions.length;
    const average = sessions.reduce((acc, s) => acc + s.score, 0) / total;
    const passed = sessions.filter(s => s.score >= 70).length;
    
    return { 
      total, 
      average: Math.round(average), 
      passed, 
      passRate: Math.round((passed / total) * 100) 
    };
  }, [sessions]);
}

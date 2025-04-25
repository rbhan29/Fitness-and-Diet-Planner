
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface Stats {
  workouts: {
    count: number;
    change: number;
  };
  calories: {
    burned: number;
    change: number;
  };
  weight: {
    current: number;
    change: number;
  };
  progress: {
    percentage: number;
    change: number;
  };
}

export const useStats = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<Stats>({
    workouts: { count: 0, change: 0 },
    calories: { burned: 0, change: 0 },
    weight: { current: 0, change: 0 },
    progress: { percentage: 0, change: 0 },
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    setStats({
      workouts: {
        count: 16,
        change: 3,
      },
      calories: {
        burned: 8540,
        change: 12,
      },
      weight: {
        current: currentUser?.weight || 70,
        change: -2.5,
      },
      progress: {
        percentage: 68,
        change: 5,
      },
    });
  }, [currentUser]);

  return stats;
};

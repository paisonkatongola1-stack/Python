/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { pb } from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';

export function usePocketBaseList<T extends RecordModel>(
  collectionName: string,
  options: Record<string, unknown> = { sort: '-created' }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const optionsKey = JSON.stringify(options);
  const memoOptions = useMemo(() => options, [optionsKey]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const records = await pb.collection(collectionName).getFullList<T>(memoOptions as any);
      setData(records);
      setError(null);
    } catch (err) {
      console.error(`Error fetching from ${collectionName}:`, err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [collectionName, memoOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}

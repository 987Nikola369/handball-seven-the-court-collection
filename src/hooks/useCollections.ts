import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbCollection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  is_visible: boolean;
  sort_order: number;
}

export function useCollections(visibleOnly = true) {
  return useQuery({
    queryKey: ['collections', visibleOnly],
    queryFn: async () => {
      let query = supabase.from('collections').select('*').order('sort_order');
      if (visibleOnly) query = query.eq('is_visible', true);
      const { data, error } = await query;
      if (error) throw error;
      return data as DbCollection[];
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSiteContent(key?: string) {
  return useQuery({
    queryKey: ['site_content', key],
    queryFn: async () => {
      if (key) {
        const { data, error } = await supabase.from('site_content').select('*').eq('key', key).single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateSiteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['site_content'] }),
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  collection: string;
  badge: string | null;
  sizes: string[];
  colors: string[];
  image_url: string;
  stock_status: string;
  stock_quantity: number;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function useProducts(visibleOnly = true) {
  return useQuery({
    queryKey: ['products', visibleOnly],
    queryFn: async () => {
      let query = supabase.from('products').select('*').order('sort_order');
      if (visibleOnly) query = query.eq('is_visible', true);
      const { data, error } = await query;
      if (error) throw error;
      return data as DbProduct[];
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data as DbProduct;
    },
    enabled: !!slug,
  });
}

export function useUpsertProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Partial<DbProduct> & { id?: string }) => {
      if (product.id) {
        const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('products').insert([product as any]).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

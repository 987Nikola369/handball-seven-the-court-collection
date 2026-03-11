import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbOrder {
  id: string;
  user_id: string | null;
  status: string;
  items: any[];
  total: number;
  shipping_address: any;
  customer_email: string | null;
  customer_name: string | null;
  notes: string;
  created_at: string;
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbOrder[];
    },
  });
}

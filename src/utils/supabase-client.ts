import {} from '@supabase/supabase-js';

import { supabaseAdmin } from './supabase';
import { PostCard } from '../types';
// export const supabase = createBrowserSupabaseClient<Database>();

export const getPostcards = async (): Promise<PostCard[]> => {
  const { data, error } = await supabaseAdmin.from('postcards').select('*');
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export const getPostcard = async (postcardId: number): Promise<PostCard> => {
  const { data, error } = await supabaseAdmin
    .from('postcards')
    .select('*')
    .eq('id', postcardId);
  if (error || !data) {
    console.log(error.message);
    throw new Error('failed to fetch data');
  }
  return data[0];
};

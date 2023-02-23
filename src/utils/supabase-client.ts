import { createClient } from '@supabase/supabase-js';

import { supabaseAdmin } from './supabase';
import { PostCard } from '../types';

import { Database } from '@/types_db';

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

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

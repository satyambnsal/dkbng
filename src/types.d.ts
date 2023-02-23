export type PostCard = {
  id: number;
  created_at: string | null;
  front_image_url: string;
  back_image_url: string;
  description: string;
  price: number;
  is_available: boolean | null;
  rank: number;
  title: string;
  rating: number;
};

export type UserDetails = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
};

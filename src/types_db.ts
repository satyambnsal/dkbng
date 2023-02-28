export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          address: string
          alt_contact_no: string | null
          city: string
          contact_email: string | null
          contact_no: string
          created_at: string | null
          id: number
          landmark: string | null
          locality: string | null
          name: string
          pincode: string
          state: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          alt_contact_no?: string | null
          city: string
          contact_email?: string | null
          contact_no: string
          created_at?: string | null
          id?: number
          landmark?: string | null
          locality?: string | null
          name: string
          pincode: string
          state: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          alt_contact_no?: string | null
          city?: string
          contact_email?: string | null
          contact_no?: string
          created_at?: string | null
          id?: number
          landmark?: string | null
          locality?: string | null
          name?: string
          pincode?: string
          state?: string
          title?: string | null
          user_id?: string | null
        }
      }
      orders: {
        Row: {
          address_id: number | null
          amount: number | null
          created_at: string | null
          id: number
          postcard_id: number | null
          status: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          address_id?: number | null
          amount?: number | null
          created_at?: string | null
          id?: number
          postcard_id?: number | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          address_id?: number | null
          amount?: number | null
          created_at?: string | null
          id?: number
          postcard_id?: number | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
      }
      postcards: {
        Row: {
          back_image_url: string
          created_at: string | null
          description: string
          front_image_url: string
          id: number
          is_available: boolean | null
          price: number
          rank: number
          rating: number
          title: string
        }
        Insert: {
          back_image_url: string
          created_at?: string | null
          description: string
          front_image_url: string
          id?: number
          is_available?: boolean | null
          price?: number
          rank?: number
          rating?: number
          title?: string
        }
        Update: {
          back_image_url?: string
          created_at?: string | null
          description?: string
          front_image_url?: string
          id?: number
          is_available?: boolean | null
          price?: number
          rank?: number
          rating?: number
          title?: string
        }
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


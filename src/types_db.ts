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
      Address: {
        Row: {
          address: string
          city: string | null
          contact_email: string | null
          contact_no: string | null
          Country: string | null
          created_at: string | null
          id: number
          Landmark: string | null
          person_name: string | null
          postal_code: number | null
          state: string | null
          title: string | null
        }
        Insert: {
          address: string
          city?: string | null
          contact_email?: string | null
          contact_no?: string | null
          Country?: string | null
          created_at?: string | null
          id?: number
          Landmark?: string | null
          person_name?: string | null
          postal_code?: number | null
          state?: string | null
          title?: string | null
        }
        Update: {
          address?: string
          city?: string | null
          contact_email?: string | null
          contact_no?: string | null
          Country?: string | null
          created_at?: string | null
          id?: number
          Landmark?: string | null
          person_name?: string | null
          postal_code?: number | null
          state?: string | null
          title?: string | null
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
          user_id: number | null
        }
        Insert: {
          address_id?: number | null
          amount?: number | null
          created_at?: string | null
          id?: number
          postcard_id?: number | null
          status?: string | null
          transaction_id?: string | null
          user_id?: number | null
        }
        Update: {
          address_id?: number | null
          amount?: number | null
          created_at?: string | null
          id?: number
          postcard_id?: number | null
          status?: string | null
          transaction_id?: string | null
          user_id?: number | null
        }
      }
      postcards: {
        Row: {
          back_image_url: string | null
          created_at: string | null
          description: string
          front_image_url: string
          id: number
          is_available: boolean | null
          price: number | null
        }
        Insert: {
          back_image_url?: string | null
          created_at?: string | null
          description: string
          front_image_url: string
          id?: number
          is_available?: boolean | null
          price?: number | null
        }
        Update: {
          back_image_url?: string | null
          created_at?: string | null
          description?: string
          front_image_url?: string
          id?: number
          is_available?: boolean | null
          price?: number | null
        }
      }
      users: {
        Row: {
          address: number | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: number
        }
        Insert: {
          address?: number | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: number
        }
        Update: {
          address?: number | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: number
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


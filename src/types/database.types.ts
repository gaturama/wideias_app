export interface Database {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['locations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['locations']['Insert']>
      }
      products: {
        Row: {
          id: string
          location_id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      orders: {
        Row: {
          id: string
          user_id: string
          location_id: string
          status: string
          total: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          observations: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
      }
    }
  }
}

export type Location = Database['public']['Tables']['locations']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']

export interface CartItem {
  product: Product
  quantity: number
  observations?: string
}
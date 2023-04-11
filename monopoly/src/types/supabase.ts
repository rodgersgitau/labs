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
      games: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
      }
      "user-scores": {
        Row: {
          created_at: string | null
          game: string
          id: number
          score: number
          updated_at: string | null
          user: string
        }
        Insert: {
          created_at?: string | null
          game: string
          id?: number
          score?: number
          updated_at?: string | null
          user: string
        }
        Update: {
          created_at?: string | null
          game?: string
          id?: number
          score?: number
          updated_at?: string | null
          user?: string
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

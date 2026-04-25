export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          full_name: string;
          headline: string | null;
          short_bio: string | null;
          long_bio: string | null;
          nationalities: Json;
          base_country: string | null;
          public_email: string | null;
          public_whatsapp: string | null;
          website_url: string | null;
          cv_url: string | null;
          profile_image_url: string | null;
          availability_status: string;
          languages: Json;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profile']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['profile']['Insert']>;
      };
      contacts: {
        Row: { id: string; profile_id: string; type: string; label: string | null; value: string; is_primary: boolean; is_public: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
      };
      social_links: {
        Row: { id: string; profile_id: string; platform: string; label: string | null; url: string; icon: string | null; is_public: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['social_links']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['social_links']['Insert']>;
      };
      skills: {
        Row: { id: string; profile_id: string; name: string; slug: string; category: string | null; level: string | null; years_experience: number | null; featured: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      certifications: {
        Row: { id: string; profile_id: string; name: string; slug: string; issuer: string | null; issue_date: string | null; expiry_date: string | null; credential_id: string | null; credential_url: string | null; status: string; category: string | null; notes: string | null; featured: boolean; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      education: {
        Row: { id: string; profile_id: string; school: string; program: string | null; degree: string | null; location: string | null; start_date: string | null; end_date: string | null; is_current: boolean; description: string | null; is_public: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['education']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['education']['Insert']>;
      };
      work_experiences: {
        Row: { id: string; profile_id: string; company: string; slug: string; role: string; location: string | null; country: string | null; employment_type: string | null; start_date: string | null; end_date: string | null; is_current: boolean; short_summary: string | null; full_description: string | null; responsibilities: Json; achievements: Json; skills_used: Json; company_url: string | null; cover_image_url: string | null; featured: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['work_experiences']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['work_experiences']['Insert']>;
      };
      projects: {
        Row: { id: string; profile_id: string; name: string; slug: string; project_type: string | null; status: string; start_date: string | null; end_date: string | null; short_summary: string | null; full_description: string | null; country: string | null; industry: string | null; stack: Json; tags: Json; website_url: string | null; repo_url: string | null; demo_url: string | null; cover_image_url: string | null; gallery: Json; featured: boolean; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      project_links: {
        Row: { id: string; project_id: string; label: string; url: string; link_type: string | null; sort_order: number; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['project_links']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['project_links']['Insert']>;
      };
      blog_categories: { Row: { id: string; name: string; slug: string; description: string | null; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['blog_categories']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['blog_categories']['Insert']> };
      blog_tags: { Row: { id: string; name: string; slug: string; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['blog_tags']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['blog_tags']['Insert']> };
      blog_posts: {
        Row: { id: string; profile_id: string; category_id: string | null; title: string; slug: string; excerpt: string | null; content_md: string | null; content_html: string | null; cover_image_url: string | null; status: string; published: boolean; published_at: string | null; reading_time_minutes: number | null; language: string; seo_title: string | null; seo_description: string | null; featured: boolean; author_name: string | null; allow_audio: boolean; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      blog_post_tags: { Row: { id: string; blog_post_id: string; tag_id: string; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['blog_post_tags']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['blog_post_tags']['Insert']> };
      audio_items: {
        Row: { id: string; profile_id: string; title: string; slug: string; source_type: string; source_blog_id: string | null; audio_url: string | null; provider: string | null; voice_name: string | null; language: string | null; duration_seconds: number | null; transcript_md: string | null; cover_image_url: string | null; status: string; published_at: string | null; featured: boolean; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['audio_items']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['audio_items']['Insert']>;
      };
      books: {
        Row: { id: string; profile_id: string; title: string; slug: string; author: string | null; category: string | null; status: string; rating: number | null; summary: string | null; personal_notes: string | null; cover_image_url: string | null; started_at: string | null; finished_at: string | null; language: string | null; featured: boolean; source_link: string | null; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['books']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['books']['Insert']>;
      };
      travel_entries: {
        Row: { id: string; profile_id: string; country: string; city: string | null; slug: string; start_date: string | null; end_date: string | null; summary: string | null; notes_md: string | null; latitude: number | null; longitude: number | null; travel_type: string | null; featured: boolean; cover_image_url: string | null; status: string; created_at: string; updated_at: string };
        Insert: Omit<Database['public']['Tables']['travel_entries']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['travel_entries']['Insert']>;
      };
      travel_media: { Row: { id: string; travel_entry_id: string; media_type: string; url: string; caption: string | null; sort_order: number; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['travel_media']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['travel_media']['Insert']> };
      media_assets: { Row: { id: string; profile_id: string; title: string | null; file_url: string; file_type: string | null; alt_text: string | null; width: number | null; height: number | null; related_table: string | null; related_id: string | null; storage_bucket: string | null; is_public: boolean; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['media_assets']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['media_assets']['Insert']> };
      timeline_events: { Row: { id: string; profile_id: string; title: string; event_date: string | null; event_type: string | null; summary: string | null; related_table: string | null; related_id: string | null; featured: boolean; sort_order: number; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['timeline_events']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['timeline_events']['Insert']> };
      quotes_or_notes: { Row: { id: string; profile_id: string; type: string; title: string | null; content: string; language: string; source_context: string | null; published_at: string | null; featured: boolean; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['quotes_or_notes']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['quotes_or_notes']['Insert']> };
      copilot_knowledge_overrides: { Row: { id: string; profile_id: string; key: string; title: string | null; content: string; priority: number; is_active: boolean; created_at: string; updated_at: string }; Insert: Omit<Database['public']['Tables']['copilot_knowledge_overrides']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<Database['public']['Tables']['copilot_knowledge_overrides']['Insert']> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

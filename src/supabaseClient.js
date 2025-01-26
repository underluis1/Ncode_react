import { createClient } from '@supabase/supabase-js';

// Sostituisci con le tue credenziali
const supabaseUrl = 'https://mruvncpppmwsfywppfef.supabase.co'; // URL del tuo progetto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydXZuY3BwcG13c2Z5d3BwZmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NjcxODEsImV4cCI6MjA0NDA0MzE4MX0.Fhb5xZ3YWX5QUdr1Qr8tlFROsXPq3zwOATsdC4yFsQg'; // Chiave anonima

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 
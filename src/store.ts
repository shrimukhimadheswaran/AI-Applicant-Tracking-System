import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { demoCandidates,demoJobs } from './domain';
export const supabase:SupabaseClient|null=import.meta.env.VITE_SUPABASE_URL&&import.meta.env.VITE_SUPABASE_ANON_KEY?createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY):null;
export const DEMO_KEY='hireswift-demo-v1';
export function initialState(){try{const s=localStorage.getItem(DEMO_KEY);if(s)return JSON.parse(s)}catch{}return {candidates:demoCandidates,jobs:demoJobs,activities:['Demo workspace loaded','15 sample profiles ready','Rule-based match engine active']};}
export function persistState(state:unknown){localStorage.setItem(DEMO_KEY,JSON.stringify(state));}

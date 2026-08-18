export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const res = await fetch(`${SUPABASE_URL}/rest/v1/transacoes?perfil_id=eq.${id}`, {
    headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
    }
})
const data = await res.json()
import supabase from "./supabase";

export async function login({email, password}){
    let { data, error } = await supabase.auth.signInWithPassword({D
        email: 'someone@email.com',
        password: 'jFdotwjnfvJxhlzzgaic'
      })
}
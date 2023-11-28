<script lang="ts">
    // import { createClient } from '@supabase/supabase-js';
    import supabaseClient from '$lib/supabaseClient';
    import { onMount } from 'svelte';

    // const supabaseUrl = 'https://xmutyxjqddxwqqacfxwt.supabase.co';
    // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXR5eGpxZGR4d3FxYWNmeHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNDI3MDUsImV4cCI6MjAxNjYxODcwNX0.p2Rk9nFxWAtwVPSOL7VKnq6T0JnJzcoazPBJU3frRvU';

    // const supabaseClient = createClient(supabaseUrl, supabaseKey);

    let users = [];
    let err = null;

    onMount(async () => {
        const { data, error } = await supabaseClient
            .from('Users')
            .select(`
                *,
                Products!inner (
                    *
                )
            `)
        
        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        } 

        console.log(data);
        users = data;
    });

</script>
<h1>Supabase client demo</h1>

{#if users.length > 0}
    {#each users as user}
        <p>{user.username} {user.firstName} {user.lastName}</p>
    {/each}
{:else}
    <p>No users</p>
{/if}

{#if err}
    <p style="color:red">{err}</p>
{/if}

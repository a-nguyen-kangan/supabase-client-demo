<script lang="ts">
    // import { createClient } from '@supabase/supabase-js';
    import supabaseClient from '$lib/supabaseClient';
    import { onMount } from 'svelte';

    // const supabaseUrl = 'https://xmutyxjqddxwqqacfxwt.supabase.co';
    // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXR5eGpxZGR4d3FxYWNmeHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNDI3MDUsImV4cCI6MjAxNjYxODcwNX0.p2Rk9nFxWAtwVPSOL7VKnq6T0JnJzcoazPBJU3frRvU';

    // const supabaseClient = createClient(supabaseUrl, supabaseKey);

    let users = [];
    let err = null;

    let session = null;

    onMount(async () => {
        getSession();
    });

    async function getUsers() {
        const { data, error } = await supabaseClient
            .from('Users_Protected')
            .select('*')
        
        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        } 

        console.log(data);
        users = data;
    }

    async function getSession() {
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        }

        session = data;
        console.log(data);
    }

    async function login() {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: 'me@person.com',
            password: 'abcd1234',
        });

        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        }

        session = data.session;
        console.log(data);
    }

    async function logout() {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        }

        session = null;
    }

    async function loginGithub() {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'github'
        })

        if (error) {
            err = error.message;
            console.log("error: ", error);
            return;
        }

        session = data.session;
        console.log(data);
    }

</script>
<h1>Supabase client demo</h1>

<button on:click={getUsers}>Get Users</button><br>
<button on:click={getSession}>Get Session</button><br>
<button on:click={login}>Log in</button>
<button on:click={loginGithub}>GitHub login</button>
<button on:click={logout}>Log out</button>
<br>
<hr>
Session: {#if session}
        {session.session.access_token}<br>
    {:else}
        No session<br>
    {/if}


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

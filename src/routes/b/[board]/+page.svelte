<script lang="ts">
	import type { PageData } from "./$types";

    import { page } from "$app/stores";
    import { superForm } from 'sveltekit-superforms/client';
    
    export let data: PageData;

    const { form, errors, constraints, enhance } = superForm(data.form, {
        resetForm: true,
    });

	import Post from "$lib/components/Post.svelte";
	import Card from "$lib/components/Card.svelte";
    // console.log($page.data)
</script>

<svelte:head>
    <title>/b/{data.boardName} - nahcrof-ng</title>
</svelte:head>

<h1 class="text-2xl">/b/{data.boardName} - {data.boardDescription}</h1>
<Card title="New Post" class="w-96 lg:w-96">
    <form class="w-full flex flex-col items-center gap-2" method="POST" use:enhance>
        <div class="w-full flex flex-col items-center">
            <label class="w-3/4" for="name">Username {#if $errors.name}- <span class="text-red-500">{$errors.name}</span>{/if}</label>
            <input name="name" type="text" bind:value={$form.name} {...$constraints.name} class="rounded-lg w-3/4 p-2 text-black">
        </div>
        <div class="w-full flex flex-col items-center">
            <label class="w-3/4" for="text">Text {#if $errors.text}- <span class="text-red-500">{$errors.text}</span>{/if}</label>
            <textarea name="text" placeholder="What'cha thinkin'?" bind:value={$form.text} {...$constraints.text} class="rounded-lg w-3/4 p-2 text-black"></textarea>
        </div>
        <div class="w-full flex flex-col items-center">
            <label class="w-3/4" for="name">Image {#if $errors.image}- <span class="text-red-500">{$errors.image}</span>{/if}</label>
            <input name="image" type="text" placeholder="https://i.imgur.com/..." bind:value={$form.image} {...$constraints.image} class="rounded-lg w-3/4 p-2 text-black">
        </div>
        <button type="submit" class="w-3/4 p-2 rounded-lg bg-black text-white border-white border hover:bg-white hover:text-black transition-colors">Post</button>
    </form>
</Card>
{#if data.posts}
    {#each data.posts as post}
        <Post ident={post.identifier} board={post.board} name={post.name} text={post.text} image={post.image} />
    {/each}
{/if}
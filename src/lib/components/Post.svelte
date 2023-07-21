<script lang="ts">
	import PostBtn from "./PostBtn.svelte";

    export let name: string;
    export let text: string;
    export let image: string | undefined;
    export let ident: string;
    export let board: string;
</script>

<div class="w-96 border p-2 border-white rounded-xl overflow-hidden">
    <div class="w-full">
        <span class="text-xl">{name} - /b/{board}/</span>
    </div>
    <div class="flex flex-col gap-2 items-center p-2">
        <span>{text}</span>
        {#if image}
            <img src={image} alt={""} />
        {/if}
        <div class="w-full">
            <PostBtn href={`/b/${board}/${ident}/reply`}>Reply</PostBtn>
            <PostBtn href={`/b/${board}/${ident}`}>View Thread (0)</PostBtn>
        </div>
    </div>
</div>
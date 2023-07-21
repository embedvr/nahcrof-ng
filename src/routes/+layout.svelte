<script lang="ts">
	import { page } from "$app/stores";
    import NavButton from "$lib/components/NavButton.svelte";
    console.log($page.url.pathname)
    import "../app.css";
</script>

<div class="mx-auto container">
    <nav class="w-full flex justify-center gap-4 mt-2">
        <NavButton href="/" active={$page.url.pathname === '/'}>Home</NavButton>
        <NavButton href="/b/r" active={$page.url.pathname.startsWith('/b/r')}>Random</NavButton>
    </nav>
    <main class="flex flex-col items-center gap-2 mt-2">
        <slot />
    </main>
</div>
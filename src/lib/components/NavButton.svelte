<script lang="ts">
    export let href: string;
    export let active: boolean;
</script>

<a href={href} class={`py-2 text-xl w-28 text-center rounded-xl ${active ? `bg-purple-500 text-black border-white border hover:bg-white hover:text-black` : `bg-black text-white border-white border hover:bg-white hover:text-black`} transition-colors`}>
    <slot />
</a>
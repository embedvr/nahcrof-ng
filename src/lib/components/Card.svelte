<script lang="ts">
    export let title: string;
    let classPassthrough: string = "";
    export { classPassthrough as class }
</script>

<div class={`w-96 lg:w-1/2 border border-white rounded-xl overflow-hidden ${classPassthrough}`}>
    <div class="w-full bg-neutral-950 text-center">
        <span class="text-xl">{title}</span>
    </div>
    <div class="flex flex-col gap-2 items-center p-2">
        <slot />
    </div>
</div>
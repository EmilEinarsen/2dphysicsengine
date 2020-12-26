<script>
    import { onMount } from 'svelte'
    import Engine from '../../engine'

    let engine

    onMount(() => new Engine({ id: 'canvas' }))
</script>

<canvas id="canvas">
    <slot></slot>
</canvas>
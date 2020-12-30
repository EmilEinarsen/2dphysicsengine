<script>
    import { onMount } from 'svelte'
	import Engine from '../../engine'

	onMount(() => Engine({ 
		id: 'canvas', 
		settings: { 
			mode: Engine.MODE.DEBUG, 
			perspective: Engine.PERSPECTIVES.SIDE,
			edges: true
		} 
	}))
	
</script>

<canvas id="canvas">
    <slot></slot>
</canvas>
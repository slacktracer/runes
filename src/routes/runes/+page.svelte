<script lang="ts">
	import Main from '$lib/components/Main.svelte';

	let webSocketEstablished = false;
	let ws: WebSocket | null = null;
	let log: string[] = [];

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	const establishWebSocket = () => {
		console.log('run');
		if (webSocketEstablished) return;
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);
		ws.addEventListener('open', (event) => {
			webSocketEstablished = true;
			console.log('[websocket] connection open', event);
			logEvent('[websocket] connection open');
		});
		ws.addEventListener('close', (event) => {
			console.log('[websocket] connection closed', event);
			logEvent('[websocket] connection closed');
		});
		ws.addEventListener('message', (event) => {
			console.log('[websocket] message received', event);
			logEvent(`[websocket] message received: ${event.data}`);
		});
	};

	typeof window !== 'undefined' && establishWebSocket();

	const requestData = async () => {
		const res = await fetch('/test');
		const data = await res.json();
		console.log('Data from GET endpoint', data);
		logEvent(`[GET] data received: ${JSON.stringify(data)}`);
	};
</script>

<Main></Main>

<!--<button disabled={webSocketEstablished} on:click={() => establishWebSocket()}>-->
<!--	Establish WebSocket connection-->
<!--</button>-->

<button on:click={() => requestData()}> Request Data from GET endpoint </button>

<ul>
	{#each log as event}
		<li>{event}</li>
	{/each}
</ul>

import { local } from '$lib/stores/local.js';
import { get } from 'svelte/store';

let webSocketEstablished = false;
export let ws: WebSocket | null = null;
let log: string[] = [];

const logEvent = (str: string) => {
	log = [...log, str];
};

const localStore = get(local);

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
		try {
			const what = JSON.parse(event.data);
			if (what.rune) {
				local.update((state) => {
					state.move = what;
					return state;
				});
			}
		} catch (error) {
			console.log(error);
		}
	});
};

typeof window !== 'undefined' && establishWebSocket();

const requestData = async () => {
	const res = await fetch('/test');
	const data = await res.json();
	console.log('Data from GET endpoint', data);
	logEvent(`[GET] data received: ${JSON.stringify(data)}`);
};

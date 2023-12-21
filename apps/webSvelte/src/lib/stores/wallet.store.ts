import { writable, type Writable } from 'svelte/store';

export const wallet: Writable<string> = writable();

export async function connectWallet() {
	if (!mina) {
		throw new Error('Auro wallet not installed');
	}
	mina.on('accountsChanged', ([address0]) => {
		wallet.set(address0);
	});
	const accounts = await window.mina.requestAccounts();
	console.log('connectWallet', accounts);
	if (Array.isArray(accounts)) wallet.set(accounts[0]);
}
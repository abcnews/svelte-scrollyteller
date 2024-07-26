/**
 * @file
 * Web component entrypoint. Everything in this entrypoint gets compiled down
 * to plain Javascript so it can be consumed by non-Svelte projects.
 */
import Scrollyteller from './Scrollyteller.wc.svelte';
export { loadScrollyteller } from './utils.js';

export default Scrollyteller;

<script>/**
 * @file
 * 2024-09 : This block checks for deprecated usage & throws helpful errors.
 * Please remove it after a suitable time has passed.
 */
export let onProgress;
export let onMarker;
$: {
    if (typeof onProgress === 'function') {
        throw new Error('the onProgress callback is deprecated. Please use on:progress');
    }
    if (typeof onMarker === 'function') {
        throw new Error('the onMarker callback is deprecated. Please use on:marker');
    }
}
</script>

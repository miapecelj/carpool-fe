import { onUnmounted, onMounted, ref } from "vue";

export function useGeolocation() {
    const coords = ref({ lat: 0, lng: 0})
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher = null
    onMounted(() => {
        if (isSupported) {
            watcher = navigator.geolocation.watchPosition(
                position => {
                    coords.value.lat = position.coords.latitude
                    coords.value.lng = position.coords.longitude
                }
            )
        }
    })

    onUnmounted(() => {
        if (watcher) {
            navigator.geolocation.clearWatch(watcher)
        }
    })

    return { coords, isSupported }
}

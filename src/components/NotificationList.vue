<template>
    <Notification v-for="notification in notifications" :notification="notification" :key="notification.id" />
</template>

<script>
import {
  // IonContent,
} from "@ionic/vue";
import Notification from './Notification.vue'
import { ref } from '@vue/reactivity';

export default {
    components: {
        // IonContent,
        Notification,
    },
    props: {
        data: {
            type: Array
        }
    },
    setup(props) {
        const notifications = ref(props.data)
        console.log(props.data)

        return {
            notifications,
        }
    }

}
</script>

<style>

</style>

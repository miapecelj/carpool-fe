<template>
  <ion-card>
      {{data.capacity}}
  </ion-card>
</template>

<script>
import {
  IonCard,
  // IonTitle,
  // IonText,
} from "@ionic/vue"
import { ref } from '@vue/reactivity'

export default {
  name: "Ride",
  props: ['rideData'],
  components: {
    IonCard,
    // IonTitle,
    // IonText,
  },
  setup(props) {
    const data = ref(props['rideData'])

    console.log(data)

    return {
      data,
    }
  }
}
</script>

<style>

</style>

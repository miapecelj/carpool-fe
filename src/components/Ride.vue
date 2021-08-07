<template>
  <ion-card>
    <div class="ride-container">
      <!-- {{data.from}} -->
      <span class="ride-container__address">{{ `${data.from.street} ..... ${data.to.street}` }}</span>
    </div>
  </ion-card>
</template>

<script>
import {
  IonCard,
  // IonCardText,
  // IonTitle,
  // IonText,
} from "@ionic/vue"
import { ref } from '@vue/reactivity'

export default {
  name: "Ride",
  props: {
    rideData: {
      type: Object
    }
  },
  components: {
    IonCard,
    // IonCardText,
    // IonTitle,
    // IonText,
  },
  setup(props) {
    const data = ref(props.rideData)

    console.log(Object.keys(data.value))

    return {
      data,
    }
  }
}
</script>

<style>

.ride-container {
  
}

.ride-container__address {

}

</style>

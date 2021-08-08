<template>
  <ion-card>
      <ion-list class="ride-container" style="list-style-type: none">
        <ion-item>{{`From: ${data.from.street} ${data.from.number}`}}</ion-item>
        <ion-item>{{`To: ${data.to.street} ${data.to.number}`}}</ion-item>
        <ion-item>{{`Car: ${data.driver.car.manufacturer} ${data.driver.car.model}`}}</ion-item>
        <ion-item>{{`Color: ${data.driver.car.color}`}}</ion-item>
        <ion-item>{{`Registration number: ${data.driver.car.id}`}}</ion-item>
        <ion-item>{{`Price per person: ${data.pricePerPerson}`}}</ion-item>
        <ion-item>{{`Driver: ${data.driver.username}`}}</ion-item>
      </ion-list>
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

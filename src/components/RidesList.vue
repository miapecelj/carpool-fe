<template>
  <ion-content>
    <h1 align="center">DISPLAY MY RIDES</h1>
    <ion-item v-if="rides.length==0">There are no rides for that date/time.</ion-item>
    <Ride v-for="ride in rides" :ride-data="ride" :key="ride.id" />
  </ion-content>
</template>

<script>
import { ref } from "@vue/reactivity";

import Ride from "@/components/Ride.vue";
import {IonContent, IonItem} from "@ionic/vue";

export default {
  name: "RidesList",
  components: {
    Ride,
    IonContent,
    IonItem,
  },
  props: {
    data: {
      type: Array
    }
  },
  setup(props) {
    const rides = ref(props.data);
    console.log(rides.value)
    // const isFinished = ref(false);
    // const finishTabOpen = ref(false);
    // return {
    //   isFinished,
    //   finishTabOpen,
    // };

    return {
      rides,
    };
  },
};
</script>

<style>
.rides-list {
  z-index: 10;
  overflow: scroll;
}
</style>

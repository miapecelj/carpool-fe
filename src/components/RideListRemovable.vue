<template>
  <ion-content>
    <RideRemovable v-for="ride in rides" @remove="removeRide" :ride-data="ride" :key="ride.id" />
  </ion-content>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import { ref } from "@vue/reactivity";

import RideRemovable from "@/components/RideRemovable.vue";
import {IonContent} from "@ionic/vue";

export default {
  name: "RideListRemovable",
  components: {
    RideRemovable,
    IonContent
  },
  props: {
    data: {
      type: Array
    }
  },
  setup(props) {
    console.log(props.data)
    const rides = ref(props.data);
    console.log(rides.value)

    const removeRide = (rideData) => {
      let i = 0
      const new_rides = []
      for (const ride of rides.value) {
        if (ride.id !== rideData.id) {
          console.log(ride)
          new_rides[i] = ride
          i += 1
        }
      }
      rides.value = new_rides
    }
    
    return {
      removeRide,
      rides,
      // removeRideSetup,
    };
  },
};
</script>

<style>
</style>

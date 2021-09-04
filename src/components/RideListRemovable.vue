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
    const removeRide = (rideData) => {
      let i = 0
      const new_rides = []
      for (const ride of rides.value) {
        if (ride.id === rideData.id) {
          rides.value.splice(i,1)
           i += 1
          
        }
      }
    }
    
    return {
      removeRide,
      rides,
    };
  },
};
</script>

<style>
</style>

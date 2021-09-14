<template>

    <h1 align="center">DISPLAY MY RIDES</h1>
    <ion-item v-if="rides.length==0">There are no rides for that date/time.</ion-item>
    <Ride v-for="ride in rides" :ride-data="ride" :key="ride.id" />

</template>

<script>
import { ref } from "@vue/reactivity";

import Ride from "@/components/Ride.vue";
import {IonItem} from "@ionic/vue";
import { useStore } from 'vuex'

export default {
  name: "RidesList",
  components: {
    Ride,
    IonItem,
  },
  props: {
    data: {
      type: Array
    }
  },
  setup(props) {
    const store = useStore()
    const user = store.getters.getUser
    console.log(user)

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
      store

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

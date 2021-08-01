<template>
  <div class="rides-list">
    <h1>DISPLAY MY RIDES</h1>
    <Ride v-for="ride in rides" :rideData="ride" :key="ride.id" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import Ride from "@/components/Ride.vue";

export default {
  name: "RidesList",
  props: ["data"],
  components: {
    Ride,
  },
  setup(props) {
    const rides = ref(props["data"]);

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
}
</style>

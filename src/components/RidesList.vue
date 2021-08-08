<template>
  <div class="rides-list">
    <h1 align="center">DISPLAY MY RIDES</h1>
    <Ride v-for="ride in rides" :ride-data="ride" :key="ride.id" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import Ride from "@/components/Ride.vue";

export default {
  name: "RidesList",
  components: {
    Ride,
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

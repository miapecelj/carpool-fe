<template>
  <ion-content>
    <RideRemovable v-for="ride in rides" :ride-data="ride" :key="ride.id" />
  </ion-content>
</template>

<script>
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
    return {
      rides,
    };
  },
};
</script>

<style>
</style>

<template>
  <ion-page>
    <ion-content >
        <ion-title size="large">Created rides</ion-title>
        <RideListRemovable v-if="displayCreated" :data="createdRides" />
        <ion-title size="large">Taken rides</ion-title>
        <RideListRemovable v-if="displayTaken" :data="takenRides" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import RideListRemovable from "@/components/RideListRemovable.vue";
import { ref } from "@vue/reactivity";
import { useStore } from 'vuex'

export default {
  name: "Tab4",
  components: {
    IonTitle,
    IonContent,
    IonPage,
    RideListRemovable,
  },
  setup() {
    const store = useStore()
    const user = store.getters.getUser
    let createdRides = ref({});
    let takenRides = ref({});
    let displayCreated = ref(false);
    let displayTaken = ref(false);
    const getCreatedRides = () => {
      fetch("http://localhost:8080/carpool-be/api/ride/findUpcomingByUserId/"+user.id)
        .then((response) => response.json())
        .then((data) => {
          createdRides.value = data;
          displayCreated.value = true;
          console.log(createdRides.value);

        });
    };
    const getTakenRides = () => {
      fetch("http://localhost:8080/carpool-be/api/ride/findUpcomingTakenRidesByUserId/"+user.id)
        .then((response) => response.json())
        .then((data) => {
          takenRides.value = data;
          displayTaken.value = true;
          console.log(takenRides.value);

        });
    };
    getCreatedRides();
    getTakenRides();
    return {
      getCreatedRides,
      createdRides,
      takenRides,
      store,
      displayCreated,
      displayTaken
    };
  },
};
</script>
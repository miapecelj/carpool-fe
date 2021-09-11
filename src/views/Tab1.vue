<template>
  <ion-page>
    <Profile />
  </ion-page>
</template>

<script>
import {
  IonPage,
} from "@ionic/vue";
import Profile from "@/components/profile/Profile.vue";

export default {
  name: "Tab1",
  components: { 
    Profile,
    IonPage,
  },
};
</script>

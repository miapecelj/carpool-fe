<template>
  <form>
    <ion-label position="floating"> Phone Number </ion-label>
    <ion-input> </ion-input>
  </form>
</template>

<script>
import { IonInput, IonLabel } from "@ionic/vue";

export default {
  name: "Finish",
  components: {
    IonInput,
    IonLabel,
  },
  setup() {
    return {};
  },
};
</script>

<style>
</style>

<template>
  <form @submit.prevent="submitFinishProfile">
    <ion-item>
      <ion-label position="floating"> Username </ion-label>
      <ion-input v-model="username"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Car Plate Number </ion-label>
      <ion-input v-model="carPlateNumber"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Home Address </ion-label>
      <ion-input v-model="homeAddress"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Work Address </ion-label>
      <ion-input v-model="workAddress"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Phone Number </ion-label>
      <ion-input v-model="phoneNumber"> </ion-input>
    </ion-item>
    <ion-button type="submit" size="medium" color="success">Finish profile</ion-button>
  </form>
</template>

<script>
import { IonInput, IonLabel, IonItem, IonButton } from "@ionic/vue";
import { reactive } from '@vue/reactivity';

export default {
  name: "Finish",
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
  },
  setup() {
    const data = reactive({
      username: '',
      carPlateNumber: '',
      homeAddress: '',
      workAddress: '',
      phoneNumber: '',
    })

    const submitFinishProfile = () => {
      console.log(data)
    }
    return {
      data,
      submitFinishProfile,
    };
  },
};
</script>

<style>
</style>

<template>
  <form @submit.prevent="submitFinishProfile">
    <ion-item>
      <ion-label position="floating"> Username </ion-label>
      <ion-input v-model="data.username"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Car Plate Number </ion-label>
      <ion-input v-model="data.carPlateNumber"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Home Address </ion-label>
      <ion-input v-model="data.homeAddress"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Work Address </ion-label>
      <ion-input v-model="data.workAddress"> </ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating"> Phone Number </ion-label>
      <ion-input v-model="data.phoneNumber"> </ion-input>
    </ion-item>
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col size="12" class="ion-text-center">
          <ion-button type="submit" size="medium" color="success">Finish profile</ion-button>
        </ion-col>
    </ion-row>
  </ion-grid>
  </form>
</template>

<script>
import { IonInput, 
    IonLabel,
    IonItem, 
    IonButton,
    IonGrid,
    IonRow,
    IonCol
    } from "@ionic/vue";
import { reactive } from "@vue/reactivity";
import { useRouter } from 'vue-router';

export default {
  name: "Finish",
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {

    const router = useRouter()
    const data = reactive({
      username: "",
      carPlateNumber: "",
      homeAddress: "",
      workAddress: "",
      phoneNumber: "",
    });

    const submitFinishProfile = () => {
      const payload = {
        phone: data.phoneNumber,
        username: data.username,
        plate_number: data.carPlateNumber,
        home_address: data.homeAddress,
        work_address: data.workAddress,
      };
      console.log(payload);
      fetch(
        "http://localhost:8080/carpool-be/api/user/5",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          router.go(-1)
        })

      
    };
    return {
      data,
      submitFinishProfile,
    };
  },
};
</script>

<style>
</style>

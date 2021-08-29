<template>
<ion-page>
  <ion-content>
     <form @submit.prevent="submitFinishProfile">
      <ion-item>
        <ion-label position="floating">Full name</ion-label>
        <ion-input v-model="data.fullName"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Phone Number</ion-label>
        <ion-input v-model="data.phone"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Manufacturer</ion-label>
        <ion-select v-model="data.car.manufacturer" placeholder="Choose manufacturer">
          <ion-select-option value="Skoda">Skoda</ion-select-option>
          <ion-select-option value="Renault">Renault</ion-select-option>
          <ion-select-option value="VW">VW</ion-select-option>
          <ion-select-option value="Hyundai">Hyundai</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Model</ion-label>
        <ion-input v-model="data.car.model"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Type</ion-label>
        <ion-input v-model="data.car.type"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Color</ion-label>
        <ion-input v-model="data.car.color"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Plate number</ion-label>
        <ion-input v-model="data.car.id"> </ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Year of manufacturing</ion-label>
        <ion-datetime
          v-model="data.car.yearOfManufacturing"
          display-format="YYYY"
          placeholder="Choose year"
        ></ion-datetime>
      </ion-item>
      <ion-grid>
        <ion-row class="ion-align-items-center">
          <ion-col size="12" class="ion-text-center">
            <ion-button type="submit" size="medium" color="success">Finish profile</ion-button>
          </ion-col>
      </ion-row>
    </ion-grid>
    </form>
  </ion-content>
  </ion-page>
</template>

<script>
import { IonInput, 
    IonLabel,
    IonContent,
    IonItem, 
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonPage
    } from "@ionic/vue";
import { reactive } from "@vue/reactivity";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

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
    IonContent,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonPage
  },
  setup() {
    const store = useStore()
    const user = store.getters.getUser
    console.log(JSON.stringify(user))
    const router = useRouter()
    const data = reactive({
      id: user.id,
      fullName: user.fullName,
      car: user.car == null ? {} : user.car,
      phone: user.phone,
    });
    console.log(data)

    const submitFinishProfile = () => {
      const payload = {
        phone: data.phone,
        fullName: data.fullName,
        
        car: data.car,
      };
      if (payload.car.yearOfManufacturing != null) {
         payload.car.yearOfManufacturing = payload.car.yearOfManufacturing.toString()
        payload.car.yearOfManufacturing= payload.car.yearOfManufacturing.split('T')[0]
      }
      if(payload.car.id == null || payload.car.id=="") {
        payload.car = null;
      }
     
      console.log(payload);
      fetch(
        "http://localhost:8080/carpool-be/api/user/"+user.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => response.json())
        .then(() => {
          router.push("tab1")
        })
        
    };
    return {
      data,
      submitFinishProfile,
      store
    };
  },
};
</script>

<style>
</style>

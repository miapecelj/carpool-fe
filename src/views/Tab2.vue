<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Pretrazi</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <form @submit.prevent="onSubmit">
          <ion-item>
            <ion-label position="stacked">Polazim od</ion-label>
            <ion-input v-model="addressFrom"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Idem u</ion-label>
            <ion-input v-model="addressTo"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>MM DD YY</ion-label>
            <ion-datetime
              v-model="date"
              display-format="MM DD YY"
              placeholder="Datum polaska"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Broj putnika</ion-label>
            <ion-select v-model="numberOfPassengers" placeholder="Odaberi">
              <ion-select-option value="1">1</ion-select-option>
              <ion-select-option value="2">2</ion-select-option>
              <ion-select-option value="3">3</ion-select-option>
              <ion-select-option value="4">4</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button type="submit">Trazi</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue"
import { reactive } from '@vue/reactivity'

export default {
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const state = reactive({
      addressFrom: "",
      addressTo: "",
      date: "",
      numberOfPassengers: "",
    })
    const onSubmit = () => {
      console.log(state)
    }
    return {
      onSubmit,
      state,
    }
  },
}
</script>

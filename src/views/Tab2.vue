<template>
  <ion-page>
    <ion-content >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <form @submit.prevent="onSubmit">
          <ion-item>
            <ion-label>From</ion-label>
            <ion-input v-model="addressFrom"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>To</ion-label>
            <ion-input v-model="addressTo"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime
              v-model="date"
              display-format="DD MM YYYY"
              placeholder="Choose date"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Time</ion-label>
            <ion-datetime
              v-model="time"
              display-format="HH mm"
              placeholder="Choose time"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Number of passangers</ion-label>
            <ion-select v-model="numberOfPassengers" placeholder="Choose">
              <ion-select-option value="1">1</ion-select-option>
              <ion-select-option value="2">2</ion-select-option>
              <ion-select-option value="3">3</ion-select-option>
              <ion-select-option value="4">4</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col size="12" class="ion-text-center">
                <ion-button type="submit">Search</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </form>
      </div>
      
    <RidesList v-if="routesSearched" :data="searchedData" />
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
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import { reactive, ref } from "@vue/reactivity";
import RidesList from "@/components/RidesList.vue";
// import { useRouter } from "vue-router";

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
    IonGrid,
    IonRow,
    IonCol,
    RidesList,
  },
  setup() {
    // const router = useRouter();
    let routesSearched = ref(false);
    let searchedData = ref({});
    const state = reactive({
      addressFrom: "",
      addressTo: "",
      date: "",
      numberOfPassengers: "",
    });
    const onSubmit = () => {
      fetch(
        "http://localhost:8080/carpool-be/api/ride/search?dateTime=2021-12-12%2016:00&from.latitude=44.60230610479152&from.longtitude=20.585166156851308&to.latitude=44.78714257270379&to.longtitude=20.485718939795778"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          routesSearched.value = true;
          searchedData.value = data;
          console.log(searchedData.value)
        });
    };
    return {
      onSubmit,
      state,
      routesSearched,
      searchedData,
    };
  },
};
</script>
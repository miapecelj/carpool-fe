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
            <ion-input @keydown="fetchCoords" v-model="state.addressFrom"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>To</ion-label>
            <ion-input v-model="state.addressTo"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime
              v-model="state.date"
              display-format="DD MM YYYY"
              placeholder="Choose date"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Time</ion-label>
            <ion-datetime
              v-model="state.time"
              display-format="HH mm"
              placeholder="Choose time"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Number of passangers</ion-label>
            <ion-select v-model="state.numberOfPassengers" placeholder="Choose">
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
    <div ref="mapDiv" style="width: 100%; height: 50%"/>
    <RidesList v-if="routesSearched" :data="searchedData" />
    </ion-content>

  </ion-page>
</template>

<script>
/* eslint-disable no-undef */
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
import { useGeolocation } from '@/hooks/useGeolocation'
import { computed, onMounted } from '@vue/runtime-core';
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCqxL0u4LclvZzl4Acz3qyZAWIl285US7A'
const GEOCODING_API_KEY = 'AIzaSyBJno4ubcm1KHByphcc054awRasxWBP3a8'

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
    const map = ref(null)
    const marker = ref(null)

    const { coords } = useGeolocation()

    const fetchCoords = () => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ state.addressFrom },+Belgrade,+Serbia&key=${GEOCODING_API_KEY}`)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          const streetCoordinates = data.results[0].geometry.location
          coords.value = streetCoordinates
          map.value.setCenter(coords.value)
          marker.value.setPosition(coords.value)
        })
    }

    const currentPossition = computed(() => ({
      lat: coords.value.lat,
      lng: coords.value.lng,
    }))
    
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    onMounted(async () => {
      await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currentPossition.value,
        zoom: 16
      })
      marker.value = new google.maps.Marker({
        position: currentPossition.value,
        map: map.value,
        title: "Hello world",
      })
    })

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
      currentPossition,
      mapDiv,
      fetchCoords,
    };
  },
};
</script>

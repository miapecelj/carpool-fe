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
            <ion-input @keyup="streetFromHandler" v-model="state.addressFrom" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>To</ion-label>
            <ion-input @keyup="streetToHandler" v-model="state.addressTo" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime
              v-model="state.date"
              display-format="DD MM YYYY HH mm"
              placeholder="Choose date"
              required
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Number of passangers</ion-label>
            <ion-select v-model="state.numberOfPassengers" placeholder="Choose" required>
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
    
    <ion-modal :is-open="isOpenRef">
      <Modal :data="modalData" :setOpen="setOpen"></Modal>
    </ion-modal>
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
  IonCol,
  IonModal
} from "@ionic/vue";
import { reactive, ref } from "@vue/reactivity";
import RidesList from "@/components/RidesList.vue";
import { useGeolocation } from '@/hooks/useGeolocation'
import { computed, onMounted } from '@vue/runtime-core';
import { Loader } from '@googlemaps/js-api-loader';
import { fetchCoords } from '@/common/google-api.js'
import Modal from "@/components/Modal.vue";
//import {VueMoment} from 'vue-moment'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCqxL0u4LclvZzl4Acz3qyZAWIl285US7A'

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
    IonModal,
    Modal
  },
  setup() {
    var dateTime = ""
    let routesSearched = ref(false);
    let searchedData = ref({});
    const state = reactive({
      addressFrom: "",
      addressTo: "",
      date: "",
      numberOfPassengers: "1",
    });
    const map = ref(null)
    const marker = ref(null)

    const { coords } = useGeolocation()
    const coordsFrom = ref({})
    const coordsTo = ref({})

    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;
    let modalData = { content: 'Info message' };

    const streetFromHandler = () => {
      fetchCoords(state.addressTo)
        .then(data => {
          const streetCoordinates = data.results[0].geometry.location
          coordsFrom.value = streetCoordinates
          map.value.setCenter(coordsFrom.value)
          marker.value.setPosition(coordsFrom.value)
        })
    }
    
    const streetToHandler = () => {
      fetchCoords(state.addressTo)
        .then(data => {
          const streetCoordinates = data.results[0].geometry.location
          coordsTo.value = streetCoordinates
          map.value.setCenter(coordsTo.value)
          marker.value.setPosition(coordsTo.value)
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
      routesSearched.value = false;
      let rideDate = new Date(state.date)
      let currDate = new Date()
      if (state.date == undefined || state.date == "" || rideDate.getTime() < currDate.getTime()) {
        modalData.content = "Please insert date and time for the searched ride. Ride time must be in the future."
        setOpen(true)
        return;
      }
      dateTime = state.date.split('T')[0]+" "+state.date.split('T')[1].split(":")[0]+":"+state.date.split('T')[1].split(":")[1]
      console.log(dateTime)
      fetch(
        "http://localhost:8080/carpool-be/api/ride/search?dateTime="+dateTime+
        "&from.latitude="+coordsFrom.value.lat+"&from.longtitude="+coordsFrom.value.lng+
        "&to.latitude="+coordsTo.value.lat+"&to.longtitude="+coordsTo.value.lng
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          searchedData.value = data;
          console.log(searchedData.value)
          routesSearched.value = true;
        });
    };

    return {
      onSubmit,
      state,
      routesSearched,
      searchedData,
      currentPossition,
      mapDiv,
      streetFromHandler,
      streetToHandler,
       isOpenRef,
      setOpen,
      modalData,
    };
  },
};
</script>

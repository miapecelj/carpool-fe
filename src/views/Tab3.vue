<template>
  <ion-page>
    <ion-content >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Create new ride</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <form @submit.prevent="onSubmit">
          <ion-item>
            <ion-label>From</ion-label>
            <ion-input @keyup="fetchFromCoords" v-model="state.addressFrom" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>To</ion-label>
            <ion-input @keyup="fetchToCoords" v-model="state.addressTo" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime
              v-model="state.date"
              display-format="DD MM YYYY HH mm"
              placeholder="Choose date"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Capacity</ion-label>
            <ion-select v-model="state.capacity" placeholder="Choose">
              <ion-select-option value="1">1</ion-select-option>
              <ion-select-option value="2">2</ion-select-option>
              <ion-select-option value="3">3</ion-select-option>
              <ion-select-option value="4">4</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Price per person</ion-label>
            <ion-input type="number" v-model="state.pricePerPerson" required></ion-input>
          </ion-item>
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col size="12" class="ion-text-center">
                <ion-button type="submit">Create</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </form>
      </div>
      <div ref="mapDiv" style="width: 100%; height: 50%"/>
    </ion-content>
  </ion-page>
  <ion-modal :is-open="isOpenRef">
    <Modal :data="modalData" :setOpen="setOpen"></Modal>
  </ion-modal>
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
  IonCol,
  IonModal
} from "@ionic/vue";
import { reactive, ref } from "@vue/reactivity";
import Modal from "@/components/Modal.vue";
import { useGeolocation } from '@/hooks/useGeolocation'
import { computed, onMounted } from '@vue/runtime-core';
import { Loader } from '@googlemaps/js-api-loader';
import { useStore } from 'vuex';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCqxL0u4LclvZzl4Acz3qyZAWIl285US7A'
const GEOCODING_API_KEY = 'AIzaSyBJno4ubcm1KHByphcc054awRasxWBP3a8'

export default {
  name: "Tab3",
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
    IonModal,
    Modal,
  },
  setup() {

    const store = useStore()
    const user = store.getters.getUser

    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;
    let modalData = { content: 'Info message' };

    let routesSearched = ref(false);
    let searchedData = ref({});

    const state = reactive({
      addressFrom: "",
      addressTo: "",
      date: "",
      capacity: "4",
      pricePerPerson: "",
    });

    const map = ref(null)
    const marker = ref(null)

    const { coords } = useGeolocation()
    const coordsFrom = ref({})
    const coordsTo = ref({})


    const fetchFromCoords = () => {
      let address = state.addressFrom.replace(/\s/g, '+')
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+Belgrade,+Serbia&key=${GEOCODING_API_KEY}`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          const street = data.results[0].address_components[1].short_name
          const number = data.results[0].address_components[0].short_name
          const streetCoordinates = data.results[0].geometry.location
          coordsFrom.value = {coords: streetCoordinates, street: street, number: number}
          map.value.setCenter(coords.value)
          marker.value.setPosition(coords.value)
        })
    }
    
    const fetchToCoords = () => {
      let address = state.addressTo.replace(/\s/g, '+')
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+Belgrade,+Serbia&key=${GEOCODING_API_KEY}`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          const street = data.results[0].address_components[1].short_name
          const number = data.results[0].address_components[0].short_name
          const streetCoordinates = data.results[0].geometry.location
          coordsTo.value = {coords: streetCoordinates, street: street, number: number}
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
      // map.value = new google.maps.Map(mapDiv.value, {
      //   center: currentPossition.value,
      //   zoom: 16
      // })
      // marker.value = new google.maps.Marker({
      //   position: currentPossition.value,
      //   map: map.value,
      //   title: "Hello world",
      // })
    })

    const onSubmit = () => {
      console.log(state.date)
      state.date = state.date.toString()
      var dateTime = state.date.split(":")[0]+":"+state.date.split(":")[1]
      console.log(coordsFrom.value)
      console.log(coordsTo.value)
 
      var payload = {
        from: {
          latitude: coordsFrom.value.coords.lat,
          longtitude: coordsFrom.value.coords.lng,
          street: coordsFrom.value.street,
          number: coordsFrom.value.number

        },
        to: {
         latitude: coordsTo.value.coords.lat,
          longtitude: coordsTo.value.coords.lng,
          street: coordsTo.value.street,
          number: coordsTo.value.number
        },
        capacity: state.capacity,
        dateTime: dateTime,
        pricePerPerson: state.pricePerPerson,
        driver: user
      }

      console.log(JSON.stringify(payload))
      fetch("http://localhost:8080/carpool-be/api/rides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
           payload
          ),
        })
        .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
          console.log(data)
           routesSearched.value = true;
           searchedData.value = data;
           modalData.content = "Ride successfully created."
        })
        .catch(error => {
          modalData.content = "Error creating ride."
          console.error("There was an error!", error);
        });
        setOpen(true)
    };
    return {
      onSubmit,
      state,
      routesSearched,
      searchedData,
      isOpenRef,
      setOpen,
      modalData,
      currentPossition,
      mapDiv,
      fetchToCoords,
      fetchFromCoords,
      store
    };
  },
};
</script>
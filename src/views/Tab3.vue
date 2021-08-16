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
            <ion-input v-model="state.addressFrom" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>To</ion-label>
            <ion-input v-model="state.addressTo" required></ion-input>
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
    </ion-content>
  </ion-page>
  <ion-button @click="setOpen(true)">Show Modal</ion-button>
  <ion-modal
    :is-open="isOpenRef"
    css-class="my-custom-class"
    @didDismiss="setOpen(false)"
  >
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
    Modal
  },
  setup() {

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
    const onSubmit = () => {
      fetch("http://localhost:8080/carpool-be/api/rides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {  
                "capacity": 3,
                "dateTime": "2021-12-31T17:00:00",
                "from": {
                    "id": 1,
                    "street": "Krajiskih Brigada",
                    "number": "25",
                    "city": {
                        "postalCode": 11300,
                        "name": "Smederevo"
                    },
                    "latitude": 44.60230610479152,
                    "longtitude": 20.585166156851308
                },
                "to": {
                    "id": 2,
                    "street": "Todora Dukina",
                    "number": "79",
                    "city": {
                        "postalCode": 11000,
                        "name": "Beograd"
                    },
                    "latitude": 44.78714257270379,
                    "longtitude": 20.485718939795778
                },
                "pricePerPerson": 250.0,
                "driver": {
                    "id": 3,
                    "username": "ema",
                    "email": "ema@ema",
                    "password": "$2a$10$Kh/Pss7GgQ6yyHqoYk.d5.UgwzHCj/YaCPwoOor0nRTWbg.oM97RW",
                    "fullName": "saaf",
                    "phone": "633463",
                    "car": {
                        "id": "BG12345",
                        "manufacturer": "Skoda",
                        "model": "Octavia",
                        "type": "Caravan",
                        "yearOfManufacturing": "2005-12-12",
                        "color": "white",
                        "owner": null
                    },
                    "ratings": []
                }
           }
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
      modalData
    };
  },
};
</script>
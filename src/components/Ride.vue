<template>
  <ion-card>
       <ion-list class="ride-container">
       <ion-item lines="none" id="dest">
         {{`${data.from.street} ${data.from.number}`}} <ion-icon :icon="arrowForwardOutline"></ion-icon>{{`${data.to.street} ${data.to.number}`}}
        </ion-item> 
        <ion-item>
          <ion-label><ion-icon :icon="timeOutline"></ion-icon></ion-label>
          <ion-item lines="none">{{`${data.dateTime}`}}</ion-item>
        </ion-item>
        <ion-item>
          <ion-label><ion-icon :icon="car"></ion-icon></ion-label>
          <ion-item lines="none">{{`${data.driver.car.color} ${data.driver.car.manufacturer} ${data.driver.car.model} ${data.driver.car.id}`}}</ion-item>
        </ion-item>
        <ion-item>
          <ion-label><ion-icon :icon="cashOutline"></ion-icon></ion-label>
          <ion-item lines="none">{{`${data.pricePerPerson} din`}}</ion-item>
        </ion-item>
        <ion-item>
          <ion-label><ion-icon :icon="personOutline"></ion-icon> </ion-label>
          <ion-item lines="none">{{`${data.driver.username}`}}</ion-item>
        </ion-item>
        <ion-grid>
            <ion-row class="ion-align-items-center">
                <ion-col size="12" class="ion-text-center">
                    <ion-button size="small" @click="reserveRide(data)">Reserve</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
      </ion-list>
      <ion-modal
        :is-open="isOpenRef"
      >
        <Modal :data="modalData" :setOpen="setOpen"></Modal>
      </ion-modal>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonItem,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonLabel
} from "@ionic/vue"
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
import Modal from "@/components/Modal.vue";
import { IonIcon } from '@ionic/vue';
import { car, timeOutline, cashOutline, arrowForwardOutline, personOutline} from 'ionicons/icons';
export default {
  name: "Ride",
  props: {
    rideData: {
      type: Object
    }
  },
  components: {
    IonCard,
    IonItem,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonModal,
    Modal,
    IonIcon,
    IonLabel
  },
  setup(props) {
    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;
    let modalData = { content: 'Info message' };

    const data = ref(props.rideData)
    const store = useStore()
    const user = store.getters.getUser

    const reserveRide = (data) => { 
      fetch("http://localhost:8080/carpool-be/api/user/addRide?userId="+user.id+"&rideId="+data.id, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data)
          modalData.content = "Ride successfully reserved. You will get a notification when driver approves your request."
          setOpen(true)
      })
      .catch(error => {
        modalData.content = "Error reserving ride."
        console.error("There was an error!", error);
        setOpen(true)
      });
    };
    return {
      data,
      store,
      reserveRide,
      Modal,
      isOpenRef,
      setOpen,
      modalData,
       car,
      timeOutline,
      cashOutline,
      arrowForwardOutline,
      personOutline,
    }
  }
}
</script>

<style>
ion-item{
  --min-height: 20px;
}
</style>

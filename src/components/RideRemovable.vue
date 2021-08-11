<template>
  <ion-card>
      <ion-list>
        <ion-item>{{`From: ${data.from.street} ${data.from.number}`}}</ion-item>
        <ion-item>{{`To: ${data.to.street} ${data.to.number}`}}</ion-item>
        <ion-item>{{`Time: ${data.dateTime}`}}</ion-item>
        <ion-item>{{`Car: ${data.driver.car.manufacturer} ${data.driver.car.model}`}}</ion-item>
        <ion-item>{{`Color: ${data.driver.car.color}`}}</ion-item>
        <ion-item>{{`Registration number: ${data.driver.car.id}`}}</ion-item>
        <ion-item>{{`Price per person: ${data.pricePerPerson}`}}</ion-item>
        <ion-item>{{`Driver: ${data.driver.username}`}}</ion-item>
        <ion-grid>
            <ion-row class="ion-align-items-center">
                <ion-col size="12" class="ion-text-center">
                    <ion-button size="small" @click="removeRide(data)">Cancel</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
      </ion-list>
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
} from "@ionic/vue"
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';

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
  },
  setup(props) {
    const store = useStore()
    const user = store.getters.getUser
    const data = ref(props.rideData)
    const removeRide = (data) => { 
        if(data.driver.id == user.id) {
            //remove ride
            fetch("http://localhost:8080/carpool-be/api/ride/"+data.id+"/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            });
        }
        else {
            //remove taken ride
            fetch("http://localhost:8080/carpool-be/api/user/removeRide?userId="+user.id+"&rideId="+data.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            });
        }
    };
    return {
      data,
      store,
      removeRide,
    }
  }
}
</script>

<style>
ion-item{
  --min-height: 20px;
}
ion-button{
    --background: red;
}
</style>

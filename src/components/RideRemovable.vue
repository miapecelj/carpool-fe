<template>
  <ion-card>
      <ion-list>
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
                    <ion-button size="small" @click="remove(user, data)" color="danger">Cancel</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
      </ion-list>
  </ion-card>
</template>

<script>
/* eslint-disable no-unused-vars */
import {
  IonCard,
  IonItem,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  alertController,
} from "@ionic/vue"
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
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
    IonIcon
  },
  
  emits:[
    'remove'
  ],
  setup(props,context) {
    const store = useStore()
    const user = store.getters.getUser
    const data = ref(props.rideData)
    // const removeRide = (data) => { 
    // };
    console.log(data.value)

    const presentAlertConfirm = async () => {
      
      return new Promise((resolve,reject) => {
        alertController
          .create({
            header: 'Cancel Ride',
            message: 'Are you sure?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => reject(false),
              },
              {
                text: "I'm sure",
                handler: () => resolve(true),
              },
            ],
          })
          .then(alert => {
            alert.present()
          })
      })
      
    }

    const remove = function(user, data){
      presentAlertConfirm()
        .then(() => {
          // handle sucessfull ride cancelation
          if(data.driver.id === user.id) {
              //remove ride
              fetch("http://localhost:8080/carpool-be/api/ride/"+data.id+"/delete", {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then((response) => response.text())
              .then((responseData) => {
                context.emit('remove', data);
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
              .then((response) => response.text())
              .then((responseData) => {
                context.emit('remove', data);
              });
          } 
        })
        .catch(() => {
          // handle unsuccesfull ride cancelation
          return
        })
    }
    return {
      data,
      store,
      user,
      remove,
      car,
      timeOutline,
      cashOutline,
      arrowForwardOutline,
      personOutline,
      // removeRide,
    }
  },
  methods:{
    
  }
  
}
</script>

<style>
ion-item{
  --min-height: 20px;
}
#dest{
  font-weight: bold;
  width:100%;
  color: rgb(8, 82, 143);
  font-size: 4vw;
}
ion-label{
  font-weight: bold;
  padding: 7px;
}
ion-icon {
  font-size: 25px;
  color: rgb(8, 82, 143);
}

</style>

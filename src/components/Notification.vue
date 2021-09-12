<template>
    <ion-card>
      <ion-list v-if="!data.answered">
       <ion-item lines="none" id="dest">
           <ion-icon @click="onRemove" :icon="closeOutline"></ion-icon>
           <ion-text>{{`${data.message}`}}</ion-text>
         <!-- <ion-icon :icon="arrowForwardOutline"></ion-icon>{{`${data.to.street} ${data.to.number}`}} -->
        </ion-item> 
        <ion-item v-if="data.rideRequest">
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col size="6" class="ion-text-center">
                        <ion-button size="small" @click="onResolve(true)" color="primary">Approve</ion-button>
                    </ion-col>
                    <ion-col size="6" class="ion-text-center">
                        <ion-button size="small" @click="onResolve(false)" color="danger">Reject</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
              <!-- <ion-icon :icon="timeOutline"></ion-icon> -->
          <!-- <ion-item lines="none">{{`${data.dateTime}`}}</ion-item> -->
        </ion-item>
        <!-- <ion-item>
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
        </ion-grid> -->
      </ion-list>
  </ion-card>
</template>

<script>
import { 
    IonCard,
    IonIcon,
    // IonLabel,
    IonText,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/vue";
import { closeOutline} from 'ionicons/icons';
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
export default {
    components: {
        IonCard,
        IonIcon,
        // IonLabel,
        IonText,
        IonList,
        IonGrid,
        IonRow,
        IonCol,
    },
    props: {
        notification: {
            type: Object
        }
    },
    setup(props) {
        const data = ref(props.notification)
        const store = useStore()
        console.log(data.value)

        const onRemove = () => {
            fetch(`http://localhost:8080/carpool-be/api/notification/${data.value.id}`, {
                method: 'PUT'
            })
                .then(() => {
                    store.commit('removeNotification', data.value)
                    data.value.answered = true
                })
                .catch((error) => console.log(error))
        }

        const onResolve = (payload) => {
            fetch(`http://localhost:8080/carpool-be/api/takenRide`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: (() => {
                    const body = JSON.stringify({
                        id: data.value.takenRide.id,
                        approved: payload
                    })
                    console.log(body)
                    return body
                })()
            })
                .then(() => {
                    fetch(`http://localhost:8080/carpool-be/api/notification/${data.value.id}`, {
                        method: 'PUT'
                    })
                        .then(() => {
                            store.commit('removeNotification', data.value)
                            data.value.answered = true
                        })
                        .catch((error) => console.log(error))
                })
                .catch((error) => console.log(error))
        }

        return {
            data,
            onResolve,
            onRemove,
            closeOutline
        }
    }

}
</script>

<style scoped>

ion-icon {
    min-width: 15%;
    min-height: 90%;
}

ion-text {
    padding-left: 1em;
    max-width: 85%;
}

</style>

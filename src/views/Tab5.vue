<template>
  <ion-page>
    <ion-content>
      <NotificationList v-if="displayedNotifications" :data="notifications" />
    </ion-content>
  </ion-page>
</template>

<script>
/* eslint-disable no-unused-vars */
import {
  IonPage,
  IonContent,
} from "@ionic/vue";
import { ref } from "@vue/reactivity";
import { useStore } from 'vuex'
import NotificationList from '@/components/NotificationList.vue'
import { onBeforeUpdate } from '@vue/runtime-core';


export default {
  name: "Tab5",
  components: {
    NotificationList,
    IonContent,
    IonPage,
  },
  setup() {
    const store = useStore()
    const user = store.getters.getUser
    const notifications = ref([])
    const displayedNotifications = ref(true)

    fetch(`http://localhost:8080/carpool-be/api/notification/${user.id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        notifications.value = data
        displayedNotifications.value = true
        console.log(data)
      })
      .catch(error => console.log(error))

    onBeforeUpdate(() => {
      displayedNotifications.value = false
      fetch(`http://localhost:8080/carpool-be/api/notification/${user.id}`, {
      method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          notifications.value = data
          displayedNotifications.value = true
          console.log(data)
        })
        .catch(error => console.log(error))  
    })

    return {
      store,
      notifications,
      displayedNotifications,
    };
  },
};
</script>
<style>
</style>

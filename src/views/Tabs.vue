<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" @click="$router.push('tab1')">
          <ion-icon :icon="person" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" @click="$router.push('tab2')">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" @click="$router.push('tab3')">
          <ion-icon :icon="add" />
          <ion-label>Create</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab4" @click="$router.push('tab4')">
          <ion-icon :icon="car" />
          <ion-label>My rides</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab5" @click="$router.push('tab5')">
          <ion-icon :icon="notifications" />
          <ion-label>Notifications</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { search, car, person, add, notifications } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    
    
    return {
      search, 
      car, 
      person,
      add,
      notifications
    }
  }
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Info</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    {{ content }}
  </ion-content>
  <ion-button @click="setOpen(false)">Close</ion-button>

</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton} from '@ionic/vue';
import { ref } from "@vue/reactivity";

export default {
  name: "Modal",
  components: {
    IonToolbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton
  },
  props: {
    data: {
      type: Object,
    },
    setOpen: {
      type: Function
    }
  },
  setup(props) {
    const content = ref(props.data.content);
    return {
      content
    };
  },
};
</script>
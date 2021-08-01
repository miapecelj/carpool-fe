<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In/Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title> Welcome to Carpool </ion-card-title>
          <ion-card-subtitle> Sign In/Up </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form
            @submit.prevent="
              mode === AuthMode.SignIn
                ? signInWithEmailAndPassword(email, password)
                : signUpWithEmailAndPassword(name, email, password)
            "
          >
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating"> Name </ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating"> Email </ion-label>
              <ion-input type="email" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating"> Password </ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="
                mode =
                  mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn
              "
            >
              {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";
// import {auth, db} from '../main'
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

const AuthMode = {
  SignIn: "SignIn",
  SignUp: "SignUp",
};

export default {
  name: "Authentication",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      email: "",
      password: "",
      mode: AuthMode.SignIn,
      errorMsg: "",
    });

    

    const signInWithEmailAndPassword = (email, password) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email and password required";
          return
        }

        if(email !== 'djole@djole' && password !== 'djole') {
          state.errorMsg = "No user with that email and password"
          return
        }


        // fetch('http://localhost:8080/carpool-be/users')
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data)
        // })

        // await auth.signInWithEmailAndPassword(email, password) ???
        router.push({ path: "/tabs/tab1" });
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    const signUpWithEmailAndPassword = (name, email, password) => {
      try {
        if (!name || !email || !password) {
          state.errorMsg = "Name, email and password required";
          return;
        }


        // const authRes = await auth.createUserWithEmailAndPassword(email, password)

        // db.collection('users').doc(authRes.user?.uid).set({
        //     name,
        //     email
        // })

        router.push({ path: "/tabs/tab1" });
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    
    const logState = () => {
      console.log(state)
    }

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      logState,
      AuthMode,
    };
  },
};
</script>

<style>
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>

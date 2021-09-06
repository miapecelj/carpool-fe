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
                : signUpWithEmailAndPassword(username, email, password, confirm)
            "
          >
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating"> Username </ion-label>
              <ion-input v-model="username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating"> Email </ion-label>
              <ion-input type="email" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating"> Password </ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating"> Confirm password </ion-label>
              <ion-input type="password" v-model="confirm"></ion-input>
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
        <ion-card-content v-if="successMsg" class="success-message">
          {{ successMsg }}
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';

// import VueJwtDecode from 'vue-jwt-decode'
// import jwt-decode from "jwt-decode"

const AuthMode = {
  SignIn: "SignIn",
  SignUp: "SignUp",
};

const defaulStateObj = {
  username: "",
  email: "",
  password: "",
  mode: AuthMode.SignIn,
  successMsg: "",
  errorMsg: "",
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

    const route = useRoute()
    const router = useRouter();
    const state = reactive(defaulStateObj);
    const store = useStore()


    // read readableStream with response.text()
    if (route.query.token) {
      fetch('http://localhost:8080/carpool-be/api/user/confirm-account', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: route.query.token
      })
        .then(response => response.text())
        .then(data => {
          state.successMsg = data
        })
        .catch(error => {
          state.errorMsg = error.message
        })
    }

    const cleanErrorMessages = () => {
      state.errorMsg="";
      state.successMsg="";
    }
    const signInWithEmailAndPassword = (email, password) => {
      cleanErrorMessages();
      try {
        if (!email || !password) {
          state.errorMsg = "Email and password required";
          return;
        }
        var payload = {
          email: email,
          password: password,
        };
        fetch("http://localhost:8080/carpool-be/api/user/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(VueJwtDecode.decode(data.jwt))
            window.localStorage.setItem("jwt", data.jwt);
            router.push({ path: "/tabs/tab1" });
          })
          .catch(() => {
            state.errorMsg = "No user with such email and password.";
          });
        // await auth.signInWithEmailAndPassword(email, password) ???
        fetch("http://localhost:8080/carpool-be/api/user/findByEmail/"+email)
       .then((response) => response.json())
          .then((data) => {
            store.commit('setUser',data)
            console.log(JSON.stringify(store.getters.getUser))
          })
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    const signUpWithEmailAndPassword = (username, email, password, confirm) => {
      cleanErrorMessages();
      try {
        if (!username || !email || !password) {
          state.errorMsg = "Username, email and password required";
          return;
        }
        if(password!==confirm){
          state.errorMsg = "Passwords don't match";
          return;
        }

        var payload = {
          username: username,
          email: email,
          password: password,
        };
        console.log(JSON.stringify(payload))


        fetch("http://localhost:8080/carpool-be/api/user/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            console.log(response);
            console.log(response.status)
            state.email = ''
            state.password = ''
            state.username = ''
            state.mode = AuthMode.SignIn
            if(response.status==400) {
              state.errorMsg = "Registration failed"
            } else{
              state.successMsg = "Succesfull register. Please activate your email."
            }
          })
          .catch((error) => console.log(error));
        // const authRes = await auth.createUserWithEmailAndPassword(email, password)

        // db.collection('users').doc(authRes.user?.uid).set({
        //     Username,
        //     email
        // })
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    const logState = () => {
      console.log(state);
    };

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      logState,
      AuthMode,
      store
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

.success-message {
  color: #6f8d21;
  background-color: #dff2bf;
  text-align: center;
}
</style>

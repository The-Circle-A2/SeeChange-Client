<template>
  <div>
    <div class="circle-logo-container">
      <img class="circle-logo" src="../../../public/circle_logo_big.png" />
    </div>
    <br />
    <br />
    <form @submit.prevent="connect" novalidate>
      <p>Plak hier de gegevens uit het demo document</p>
      <br>

      <v-input
        :label="$t('_fields.username')"
        :required="true"
        :error="$v.user.username"
        v-model="user.username"
      />
      <v-textarea
        :label="$t('_fields.private_key')"
        :required="true"
        :error="$v.user.private_key"
        v-model="user.private_key"
      />
      <br />
      <v-button :label="$t('_buttons.connect')" position="full" />
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from 'axios';
const JSEncrypt = require("jsencrypt/bin/jsencrypt");
const CryptoJS = require("crypto-js");

const {
  verifyMessage
} = require('../../socket/rsaIntegrityHandler');

export default {
  name: "SignIn",

  data() {
    return {
      user: {
        username: "",
        private_key: "",
      },
    };
  },

  validations: {
    user: {
      username: {
        required,
      },
      private_key: {
        required,
      }
    },
  },

  methods: {
    connect() {
      // Bart

      this.$v.$touch();
      if (this.$v.$invalid) return;

      axios.get('http://127.0.0.1:8000/user/' + this.user.username, {
        headers: {
          'Content-Type': 'plain/text',
        },
        transformResponse: [data => data]
      })
        .then((res) => {
          /*
          Validate server response
           */
          let verified = verifyMessage({
            message: res.data,
            timestamp: res.headers['x-timestamp'],
            signature: res.headers['x-signature']
          });

          if(!verified) {
            alert('Pas op! Het verzoek van TruYou is aangepast door hackers.');
            return;
          }

          let data = JSON.parse(res.data);

          const sign = new JSEncrypt();
          sign.setPrivateKey(this.user.private_key);
          let phrase = sign.sign('phrase', CryptoJS.SHA256, "sha256");


          let verifyLocal = new JSEncrypt({default_key_size: 512});
          verifyLocal.setPublicKey(data.public_key);
          if(!verifyLocal.verify('phrase', phrase, CryptoJS.SHA256)) {
            alert('Je username en/of private key zijn niet juist.');
            return;
          }

          this.$store
              .dispatch("user/connect", this.user)
              .then(() => {
                this.$router.push({name: 'dashboard'});
              })
              .catch(() => {});
        })
        .catch((error) => {
          /*
          Validate server response
           */
          let verified = verifyMessage({
            message: error.response.data,
            timestamp: error.response.headers['x-timestamp'],
            signature: error.response.headers['x-signature']
          });

          if(verified) {
            alert('Je username en/of private key zijn niet juist.');
          }
          else {
            alert('Pas op! De response van TruYou is aangepast door hackers.');
          }
        });
    },
  },
};
</script>

<style lang="scss">
.circle-logo-container {
  display: flex;
  justify-content: center;

  .circle-logo {
    width: 250px;
  }
}
</style>

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
      <v-textarea
          :label="$t('_fields.public_key')"
          :required="true"
          :error="$v.user.public_key"
          v-model="user.public_key"
      />
      <br />
      <v-button :label="$t('_buttons.connect')" position="full" />
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "SignIn",

  data() {
    return {
      user: {
        username: "",
        private_key: "",
        public_key: ""
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
      },
      public_key: {
        required,
      },
    },
  },

  methods: {
    connect() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.$store
        .dispatch("user/connect", this.user)
        .then(() => {
          this.$router.push({name: 'dashboard'});
        })
        .catch(() => {});
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

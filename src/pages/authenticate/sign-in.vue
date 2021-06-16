<template>
  <div>
    <div class="circle-logo-container">
      <img class="circle-logo" src="../../../public/circle_logo_big.png" />
    </div>
    <br />
    <br />
    <form @submit.prevent="login" novalidate>
      <v-input
        :label="$t('_fields.email')"
        :required="true"
        v-model="user.email"
      />
      <v-input
        :label="$t('_fields.password')"
        :required="true"
        type="password"
        v-model="user.password"
      />
      <br />
      <v-button :label="$t('_buttons.sign_in')" position="full" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("authenticate/login", this.user)
        .then(() => {})
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
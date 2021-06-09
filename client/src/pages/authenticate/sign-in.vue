<template>
  <div>
    <div class="circle-logo-container">
      <img class="circle-logo" src="../../../public/circle_logo_big.png" />
    </div>
    <br />
    <br />
    <form @submit.prevent="login" novalidate>
      <v-input :label="$t('_fields.email')" v-model="user.email" />
      <v-input :label="$t('_fields.password')" v-model="user.password" />
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
    login() {},
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
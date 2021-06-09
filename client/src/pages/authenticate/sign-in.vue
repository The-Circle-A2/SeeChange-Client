<template>
  <div>
    <img class="circle-logo" src="../../../public/circle_logo.png" />
    <br />
    <br />
    <form @submit.prevent="login" novalidate>
      <v-input :label="$t('_fields.email')" v-model="user.email" />
      <v-input :label="$t('_fields.password')" v-model="user.password" />
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
</style>
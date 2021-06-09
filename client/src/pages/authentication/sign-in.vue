<template>
  <form novalidate></form>
</template>

<script>
export default {
  name: "signin",

  data() {
    return {
      email: null,
      password: null,
    };
  },

  metaInfo() {
    return { title: this.$t("sign_in") };
  },
};
</script>
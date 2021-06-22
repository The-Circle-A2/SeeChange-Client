<template>
  <h1>{{ $t("404.title") }}</h1>
</template>

<script>
export default {
  name: "NotFound",

  metaInfo() {
    return { title: this.$t("404.title") };
  },
};
</script>
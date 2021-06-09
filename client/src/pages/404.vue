<template>
  <div class="not-found">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      title: "Page not found, 404",
    };
  },
  metaInfo() {
    return { title: this.$t("page_not_found") };
  },
};
</script>
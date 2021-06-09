<template>
  <content-sidebar></content-sidebar>
</template>

<script>
import ContentSidebar from "../../components/layout/ContentSidebar.vue";

export default {
  name: "Stream",
  components: {
    ContentSidebar,
  },

  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },
};
</script>

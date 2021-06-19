<template>
  <div class="container">
    <StreamItem
      v-for="item in items"
      :key="item._id"
      :title="item.title"
      :name="item.name"
      :city="item.city"
      :to="{ name: 'stream', params: { id: item._id } }"
    />
  </div>
</template>

<script>
import StreamItem from "../../components/stream/StreamItem.vue";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    items: "dummy/streams",
  }),
  components: { StreamItem },
  name: "Dashboard",
  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 60px 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100vw;
}
</style>

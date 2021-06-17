<template>
  <div class="streamer-container">
    <NavigateBack :to="{ name: 'dashboard' }" />
    <div class="streamer">
      <Profile
        :name="stream.name"
        :followers="stream.followers"
        :city="stream.city"
        :to="{}"
      />
    </div>
    <h4 class="header">{{ $t("_streamer-profile.header") }}</h4>
    <div class="container">
      <StreamItem
        v-for="item in items"
        :key="item._id"
        :title="item.title"
        :name="item.name"
        :city="item.city"
        :to="{ name: 'stream', params: { id: item.id } }"
      />
    </div>
  </div>
</template>

<script>
import Profile from "../../components/layout/Profile.vue";
import StreamItem from "../../components/stream/StreamItem.vue";
import NavigateBack from "../../components/navigation/NavigateBack.vue";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    stream: "dummy/stream",
    items: "dummy/streams",
  }),
  components: { Profile, StreamItem, NavigateBack },
  name: "ProfilePage",
  metaInfo() {
    return { title: this.$t("_streamer-profile.title") };
  },
};
</script>

<style lang="scss" scoped>
.streamer-container {
  width: 100%;
  display: block;
  padding: 10px 63px 60px 55px;

  .streamer {
    margin-bottom: 60px;
  }
}

.header {
  margin-bottom: 10px;
  height: 1rem;
}

.container {
  margin-top: 60px 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>

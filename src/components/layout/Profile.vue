<template>
  <router-link :to="to" class="router-link">
    <div class="streamer-info">
      <img src="../../../public/avatar.png" class="streamer-avatar" />
      <div class="streamer-info-text">
        <p class="streamer-name">{{ name }}</p>
        <p></p>
        <p class="streamer-followers">
          {{ followers }} {{ $t("_stream.followers") }}
        </p>
        <p class="streamer-location">{{ city }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    name: { type: String, default: null },
    followers: { type: String, default: null },
    city: { type: String, default: null },
    to: { type: Object, default: {} },
  },

  name: "Profile",
};
</script>

<style lang="scss" scoped>
.streamer-info {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.router-link {
  text-decoration: none;
  color: #3e3e3e;
}

.streamer-avatar {
  padding-right: 15px;
  height: 60px;
  width: 60px;
}

.streamer-info-text {
  display: flex;
  flex-direction: column;
}

.streamer-name {
  font-weight: 600;
  font-size: 14px;
}

.streamer-followers {
  font-weight: 600;
  font-size: 12px;
  color: #aeb3bb;
  padding-bottom: 10px;
}

.streamer-location {
  font-weight: 300;
  font-size: 14px;
}
</style>

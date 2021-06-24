<template>
  <div class="container">
    <div v-if="streams.length != 0" class="streams">
      <StreamItem
        v-for="stream in streams"
        :key="stream"
        :title="stream"
        :to="{ name: 'stream', params: { id: stream } }"
      />
    </div>
    <p v-else>Geen streams gevonden</p>
  </div>
</template>

<script>
import StreamItem from "../../components/stream/StreamItem.vue";
import store from "../../store";

export default {
  name: "Dashboard",

  data() {
    return {
      streams: [],
    };
  },

  components: {
    StreamItem,
  },

  methods: {
    getList() {
      this.$store
        .dispatch("stream/fetchList")
        .then((res) => {
          this.streams = [];
          if (Object.keys(res).length !== 0) this.convertToArray(res.live);
        })
        .catch((err) => {
          console.log("Streams laden niet gelukt");
        });
    },
    convertToArray(list) {
      for (const [key, value] of Object.entries(list)) {
        this.streams.push(key);
      }
    },
  },

  created() {
    this.getList();

    setInterval(() => {
      this.getList();
      console.log("aangeroepen");
    }, 10000);
  },

  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },

  beforeRouteEnter(to, from, next) {
    if (store.getters["user/username"] == null) {
      next({ name: "connect" });
    } else next();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 60px 50px;
  width: 100vw;

  .streams {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}
</style>

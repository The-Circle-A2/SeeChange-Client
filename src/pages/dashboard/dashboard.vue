<template>
  <div class="container">
    <StreamItem
      v-for="stream in streams"
      :key="stream"
      :title="stream"
      :to="{ name: 'stream', params: { id: stream } }"
    />
  </div>
</template>

<script>
import StreamItem from "../../components/stream/StreamItem.vue";
import { mapGetters } from "vuex";
import store from "../../store";

export default {
  components: {
    StreamItem
  },
  name: "Dashboard",
  data(){
    return{
      streams: []      
    }
  },
  async created(){
    this.getList();
  },
  methods:{
    getList(){
      this.$store.dispatch('stream/fetchList')
        .then(res => {          
          this.convertToArray(res.live);
        }).catch(err => {
          console.log('Streams laden niet gelukt');
        })
    },
    convertToArray(list){
      for(const [key, value] of Object.entries(list)){
        this.streams.push(key);
      }  
    }
  },
  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },
  beforeRouteEnter(to, from, next) {
    if(store.getters["user/username"] == null) {
      next({name: 'connect'});
    }
    else next();
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

<template>
  <div class="sidebar">
    <h4 class="header">People you follow</h4>
    <Following
      v-for="item in items"
      :key="item._id"
      :viewers="item.viewers"
      :name="item.name"
      :city="item.city"
    />
  </div>
</template>

<script>
import Following from "../layout/Following.vue";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    items: "dummy/following",
  }),

  components: { Following },
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
.sidebar {
  flex: none;
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  height: calc(100vh - 90px);
  width: 325px;
  border-right: var(--sidebar-border-width-color) solid
    var(--sidebar-border-color);
  background-color: #fff;
  padding: 40px 30px;
}

.header {
  margin: 0px auto 15px auto;
  height: 1rem;
}
</style>

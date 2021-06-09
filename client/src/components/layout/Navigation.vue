<template>
  <header class="main-navigation">
    <div class="page-title">
      <img src="../../../public/circle_logo.png" />
      <h3>SeeChange</h3>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "authenticate/isAuthenticated",
    }),
  },
};
</script>

<style lang="scss">
.main-navigation {
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  background-color: #fff;
  border-bottom: var(--sidebar-border-width-color) solid
    var(--sidebar-border-color);
  padding: 0 30px;
  display: flex;
  align-items: center;

  .page-title {
    display: flex;
    align-items: center;

    h3 {
      margin-left: 20px;
    }
  }
}
</style>
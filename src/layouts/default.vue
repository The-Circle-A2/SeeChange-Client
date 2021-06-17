<template>
  <section class="default-container">
    <navigation />
    <main class="default-content">
      <router-view />
    </main>
  </section>
</template>

<script>
import Navigation from "../components/layout/Navigation.vue";
import Sidebar from "../components/layout/Sidebar.vue";

export default {
  components: { Navigation, Sidebar },
  name: "default",
};
</script>

<style lang="scss" scoped>
.default-container {
  display: flex;
  flex-direction: column;

  .default-content {
    display: flex;
  }
}
</style>

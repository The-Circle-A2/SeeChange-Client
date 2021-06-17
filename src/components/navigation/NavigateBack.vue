<template>
  <div class="navigate-to-dashboard">
    <router-link :to="to" class="router-link">
      <img src="../../../public/arrow.png" class="arrow" />
      <p class="navigate-to-dashboard-text">{{ $t("_navigation.back") }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavigateBack",
  props: {
    to: { type: Object, default: {} },
  },
};
</script>

<style lang="scss" scoped>
.navigate-to-dashboard {
  margin-bottom: 10px;

  .arrow {
    float: left;
    padding-right: 10px;
    width: 20px;
    height: 20px;
  }

  .navigate-to-dashboard-text {
    font-weight: 600;
    margin-top: 2px;
  }

  .router-link {
    text-decoration: none;
    color: #3e3e3e;
  }
}
</style>

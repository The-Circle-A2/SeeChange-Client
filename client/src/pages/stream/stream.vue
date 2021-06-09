<template>
  <div class="stream">
    <div class="stream-content">
      <p>test</p>
    </div>
    <div class="stream-sidebar"></div>
  </div>
</template>

<script>
export default {
  name: "Stream",

  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },
};
</script>

<style lang="scss">
.stream {
  display: flex;
  justify-content: flex-start;

  .stream-content {
    width: calc(100vw - 325px - 325px);
  }

  .stream-sidebar {
    flex: none;
    display: flex;
    box-sizing: border-box;
    height: calc(100vh - 90px);
    width: 325px;
    border-left: var(--sidebar-border-width-color) solid
      var(--sidebar-border-color);
    background-color: #fff;
    padding: 40px 30px;
  }
}
</style>
<template>
  <div class="sidebar"></div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
.sidebar {
  flex: none;
  display: flex;
  box-sizing: border-box;
  height: calc(100vh - 80px);
  width: 300px;
  border-right: var(--sidebar-border-width-color) solid
    var(--sidebar-border-color);
  background-color: #fff;
  padding: 40px 30px;
}
</style>
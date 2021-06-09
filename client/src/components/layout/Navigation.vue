<template>
  <header class="main-navigation">
    <router-link class="page-title" tag="a" :to="{ name: 'dashboard' }">
      <img src="../../../public/circle_logo.png" />
      <h3>SeeChange</h3>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.main-navigation {
  box-sizing: border-box;
  height: 90px;
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
    cursor: pointer;

    color: inherit;
    text-decoration: none;

    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }

    h3 {
      margin-left: 20px;
    }
  }
}
</style>
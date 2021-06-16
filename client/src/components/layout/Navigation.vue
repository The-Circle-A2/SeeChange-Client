<template>
  <header class="main-navigation">
    <router-link class="page-title" tag="a" :to="{ name: 'dashboard' }">
      <img class="logo" src="../../../public/circle_logo.png" />
      <h3>SeeChange</h3>
    </router-link>
    <div class="user">
      <h4>User Name</h4>
      <img src="../../../public/down_arrow.png" />
    </div>
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
  justify-content: space-between;

  .user {
    display: flex;

    img {
      width: 12px;
      height: 12px;
      margin: auto 0px auto 5px;
    }
  }

  .page-title {
    display: flex;
    align-items: center;
    cursor: pointer;

    color: inherit;
    text-decoration: none;

    .logo {
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

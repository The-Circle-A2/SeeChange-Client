<template>
  <div class="authenticate-card-container">
    <div class="authenticate-card">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "authenticate",
  data() {
    return {
      title: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.authenticate-card-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 130px 45px 45px 45px;
  box-sizing: border-box;

  .authenticate-card {
    max-width: 500px;
    width: 90%;
  }
}
</style>
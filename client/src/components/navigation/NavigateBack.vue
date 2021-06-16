<template>
<div class="navigate-to-dashboard" @click="this.$router.push('/dashboard')">
  <img src="../../../public/arrow.png" class="arrow">
  <p class="navigate-to-dashboard-text">{{$t("_navigation.back")}}</p>
</div>
</template>

<script>
export default {
  name: "NavigateBack",
};
</script>

<style lang="scss" scoped>
.navigate-to-dashboard{
  margin-top: 10px;
  margin-left: 10px;

  .arrow{
    float: left;
    padding-right: 10px;
    width: 20px;
    height: 20px;
  }

  .navigate-to-dashboard-text{
    font-weight: 600;
    margin-top: 2px;
  }
}
</style>
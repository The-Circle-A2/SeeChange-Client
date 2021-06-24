<template>
  <router-link :to="to" class="stream-item">
    <div class="thumbnail">
      <div class="live-badge">
        <span class="live-circle"></span>
        LIVE
      </div>
      <h5 class="title">{{ title }}</h5>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "StreamItem",

  props: {
    title: { type: String, default: null },
    to: { type: Object, default: {} },
  },
};
</script>

<style lang="scss" scoped>
.thumbnail {
  margin: auto 5px auto 0px;
  height: 177px;
  width: 313px;
  background-color: #fff;
  border: 2px dashed #eee;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .live-badge {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
    background-color: #e10000;
    padding: 5px 10px;
    display: flex;
    align-items: center;

    .live-circle {
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}

.title {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 500;
  max-width: 313px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.stream-item {
  margin: 0px 55px 30px 0px;
  height: auto;
  text-decoration: none;
  color: #3e3e3e;
}
</style>

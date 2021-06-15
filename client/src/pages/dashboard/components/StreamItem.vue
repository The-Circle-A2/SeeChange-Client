<template>
  <div class="stream-item">
    <span class="thumbnail"></span>
    <h5 class="title">{{ title }}</h5>
    <div class="streamer-info">
      <p>{{ name }}</p>
      <span class="seperation"></span>
      <p class="city">{{ city }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StreamItem",

  props: {
    title: { type: String, default: null },
    name: { type: String, default: null },
    city: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
.thumbnail {
  margin: auto 5px auto 0px;
  height: 177px;
  width: 313px;
  background-color: #c4c4c4;
  display: inline-block;
}

.title {
  margin-top: 10px;
  font-size: 12pt;
  max-width: 313px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.stream-item {
  margin: 0px 55px 30px 0px;
  height: auto;
}

.streamer-info {
  display: flex;
  margin-top: 5px;

  p {
    font-size: 11pt;
  }

  .city {
    font-weight: 300;
  }

  .seperation {
    margin: auto 5px auto 5px;
    height: 5px;
    width: 5px;
    background-color: #3e3e3e;
    border-radius: 50%;
    display: inline-block;
  }
}
</style>

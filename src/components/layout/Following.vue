<template>
  <div class="streamer">
    <img
      src="https://benjaminjurke.com/assets/images/authors/benjamin-jurke-v6.jpg"
      class="rounded-circle profile-photo mr-1"
    />
    <div class="streamer-info">
      <h5>{{ name }}</h5>
      <p>{{ city }}</p>
    </div>
    <div class="viewers">
      <span class="live"></span>
      <p>{{ viewers }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Following",
  props: {
    viewers: { type: Number, default: 0 },
    name: { type: String, default: null },
    city: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  border-radius: 50% !important;
}

.streamer {
  display: flex;
  margin-bottom: 10px;

  h5 {
    font-size: 11pt;
  }

  p {
    font-size: 10pt;
  }
}

.streamer-info {
  margin: 0px 15px 0px 15px;
}

.viewers {
  margin: auto 0px auto auto;
  display: flex;
}

.live {
  margin: auto 5px auto 0px;
  height: 7px;
  width: 7px;
  background-color: #e91916;
  border-radius: 50%;
  display: inline-block;
}
</style>

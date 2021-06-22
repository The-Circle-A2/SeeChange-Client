<template>
  <div
    class="column"
    :style="
      'width: calc(' +
      (format == 'desktop' ? desktop : format == 'tablet' ? tablet : mobile) +
      ' - 20px); display: flex; flex-direction: column; justify-content: ' +
      verticalAlign +
      ';'
    "
    :class="{
      'hide-tablet': tablet === 'hide',
      'hide-mobile': mobile === 'hide',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VRowItem",
  props: {
    desktop: { default: "50%" },
    tablet: { default: "100%" },
    mobile: { default: "100%" },
    "vertical-align": { default: "top" },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    format() {
      return this.windowWidth > 1200
        ? "desktop"
        : this.windowWidth > 800
        ? "tablet"
        : "mobile";
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0 10px;
  @media only screen and (max-width: 800px) {
    &.hide-tablet {
      display: none !important;
    }
  }
  @media only screen and (max-width: 800px) {
    &.hide-mobile {
      display: none !important;
    }
  }
}
</style>
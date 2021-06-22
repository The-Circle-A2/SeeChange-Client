<template>
  <div class="row-wrapper" :style="{ 'max-width': maxWidth }">
    <div
      class="row"
      :class="{ 'mobile-revert': mobileRevert }"
      :style="
        spacing != null
          ? spacing == 'large'
            ? 'margin-left: -20px; width: calc(100% + 40px);'
            : ''
          : ''
      "
    >
      <slot :spacing="spacing"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRow",
  props: {
    "max-width": {},
    spacing: {},
    mobileRevert: { default: false },
  },
};
</script>

<style lang="scss" scoped>
.row-wrapper {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  .row {
    display: flex;
    margin-left: -10px;
    width: calc(100% + 20px);
    flex-wrap: wrap;
    @media only screen and (max-width: 800px) {
      &.mobile-revert {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
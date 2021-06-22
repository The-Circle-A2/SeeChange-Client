<template>
  <button
    class="button"
    :class="
      (color == null ? '' : color) +
      ' ' +
      (size == null ? '' : size) +
      ' ' +
      position +
      ' ' +
      (active ? 'active' : '') +
      ' ' +
      (label === null ? 'icon-only' : '') +
      ' ' +
      (secondary ? 'secondary-btn' : '')
    "
    @click="clickHandle"
    :disabled="active || disabled"
  >
    <span class="material-icons" v-if="icon">{{ icon }}</span>
    {{ label }}
    <slot></slot>
    <div class="lds-ellipsis" :class="{ blue: secondary }">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    icon: {},
    label: { default: "" },
    color: {},
    secondary: {
      type: Boolean,
      default: false,
    },
    size: {},
    position: {},
    active: {},
    onClick: { default: null },
    disabled: {},
    prevent: {
      default: false,
    },
  },
  methods: {
    clickHandle(e) {
      if (this.prevent) e.preventDefault();
      if (this.onClick != null) this.onClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.lds-ellipsis div {
  background: #fff;
}
.button {
  background: var(--button-background);
  font-family: var(--button-font-family);
  box-shadow: var(--button-shadow);
  border-radius: var(--button-border-radius);
  color: var(--button-color);
  border: none;
  padding: 14px 28px;
  cursor: pointer;
  font-size: 16px;
  font-weight: var(--button-font-weight);
  letter-spacing: 0.5px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: var(--button-transition);
  &.icon-only {
    padding: 14px 0;
    width: 51px;
  }
  &:hover {
    /*background-color: #2d3748;*/
    background-color: var(--button-hover-color);
  }
  .lds-ellipsis div {
    background: var(--button-color);
  }
  .material-icons {
    position: relative;
    bottom: -4px;
    height: 10px;
    margin-top: -13px;
    margin-right: 2px;
    font-size: 20px;
  }
  &.small {
    padding: 8px 18px;
    font-size: 16px;
  }
  &.full {
    width: 100%;
  }
  &.right {
    margin-left: auto;
  }
  &.center {
    margin-left: auto;
    margin-right: auto;
  }
  &.active {
    .lds-ellipsis {
      display: inline-block;
    }
    cursor: not-allowed;
  }
  &.sharp {
    border-radius: 15px;
    padding: 19px 40px;
  }
  &.right-spacing {
    margin-left: 20px;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &.secondary-btn {
    background-color: #fff !important;
    color: var(--primary-color) !important;
    font-weight: 500 !important;
    box-shadow: none !important;
    border: 2px solid;
    &:hover {
      border-color: var(--button-hover-color);
    }
  }
}
.lds-ellipsis.blue {
  color: var(--primary-color) !important;
  background-color: var(--primary-color) !important;
}
.lds-ellipsis {
  display: none;
  position: relative;
  width: 30px;
  height: 13px;
}
.lds-ellipsis div {
  position: absolute;
  top: 5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.4s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.4s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 14px;
  animation: lds-ellipsis2 0.4s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 24px;
  animation: lds-ellipsis3 0.4s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(10px, 0);
  }
}
</style>
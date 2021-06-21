<template>
  <div class="input-holder">
    <div class="input-label">{{ label }}
      <span class="require" v-if="required">*</span>
    </div>
    <textarea
        :class="{error: (error != null && error.$error)}"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :style="'height: '+height"
        @input="keyup"></textarea>

    <div class="input-wrong" v-if="error != null && error.$error && error.required != null && !error.required">{{ $t('_validation.field_required') }}</div>
    <div class="input-wrong" v-if="error != null && error.$error && error.minLength != null && !error.minLength">{{ $t('_validation.min_length_x', {min: error.$params.minLength.min}) }}</div>
    <div class="input-wrong" v-if="error != null && error.$error && error.maxLength != null && !error.maxLength">{{ $t('_validation.max_length_x', {max: error.$params.maxLength.max}) }}</div>
  </div>
</template>

<script>
export default {
  name: 'VTextarea',

  props: {
    label: {},
    value: {},
    placeholder: {},
    type: { default: 'text' },
    required: { default: false },
    disabled: { default: false },
    height: { default: '90px' },
    error: {}
  },
  methods: {
    keyup(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-holder {

  position: relative;
  margin-bottom: 15px;
  width: 100%;

  textarea {
    //min-height: 100px;
    border-radius: var(--input-border-radius);
    border-style: solid;
    border-width: var(--input-border-width);
    border-color: var(--input-border-color);
    background: var(--input-background-color);
    padding: var(--input-padding);
    color: var(--input-color);
    font-size: var(--input-font-size);
    margin-top: 7px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    transition: all 0.2s;
    -webkit-appearance: none;

    resize: none;

    &.error {
      border-color: var(--input-error-border-color);
      background: var(--input-error-background-color);
    }

    &:disabled {
      background: var(--input-disabled-background-color);
      color: #aaa;
    }
  }

  .input-label {
    font-size: var(--input-label-font-size);
    font-weight: var(--input-label-font-weight);
    color: var(--input-label-color);
    margin-bottom: -1px;

    .require {
      color: var(--input-error-color);
      margin-left: 3px;
    }
  }

  .input-wrong {
    color: var(--input-error-color);
    letter-spacing: var(--input-error-letter-spacing);
    font-size: var(--input-error-font-size);
    position: absolute;
    right: 0;
    bottom: -18px;
    text-align: right;
  }
}

</style>

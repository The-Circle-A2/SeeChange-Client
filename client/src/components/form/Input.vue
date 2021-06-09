<template>
  <div class="input-holder" :class="{ 'is-disabled': disabled }">
    <div class="input-label">
      {{ label }}
      <span class="require" v-if="required">*</span>
      <info-circle :info="info" v-if="info" />
    </div>

    <div class="input-item" :class="{ error: error != null && error.$error }">
      <div class="prefix" v-if="prefix != null">
        {{ prefix }}
      </div>

      <datepicker
        :format="datepicker.format == null ? 'd MMMM yyyy' : datepicker.format"
        :value="value"
        :language="nl"
        :disabled-dates="datepicker.disabledDates"
        :clear-button="datepicker.clearButton"
        :typeable="datepicker.typeable"
        :minimum-view="datepicker.minimumView"
        :disabled="disabled"
        :monday-first="true"
        :placeholder="placeholder"
        @selected="selectedDate"
        @cleared="clearedDate"
        v-if="type == 'date'"
      />

      <input
        v-if="type != 'date'"
        :type="type"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        @input="keyup"
        ref="input"
        v-on:change="onChangeEvent"
        :placeholder="placeholder"
        :disabled="disabled"
      />

      <div class="suffix" v-if="suffix != null">
        {{ suffix }}
      </div>

      <div
        @click="copyURL"
        class="suffix copy"
        v-if="copy"
        v-tooltip.top="{
          content: $t('_field.copy_to_clipboard'),
          delay: 300,
        }"
      >
        <span class="material-icons">content_copy</span>
      </div>
    </div>

    <div
      class="input-wrong"
      v-if="
        error != null &&
        error.$error &&
        error.required != null &&
        !error.required
      "
    >
      {{ $t("_validation.field_required") }}
    </div>
    <div
      class="input-wrong"
      v-if="
        error != null && error.$error && error.email != null && !error.email
      "
    >
      {{ $t("_validation.wrong_email_syntax") }}
    </div>
    <div
      class="input-wrong"
      v-if="
        error != null &&
        error.$error &&
        error.minLength != null &&
        !error.minLength
      "
    >
      {{ $t("_validation.min_length_x", { min: error.$params.minLength.min }) }}
    </div>
    <div
      class="input-wrong"
      v-if="
        error != null &&
        error.$error &&
        error.maxLength != null &&
        !error.maxLength
      "
    >
      {{ $t("_validation.max_length_x", { max: error.$params.maxLength.max }) }}
    </div>
    <div
      class="input-wrong"
      v-if="
        error != null &&
        error.$error &&
        (error.required == null || error.required) &&
        error.sameAsPassword != null &&
        !error.sameAsPassword
      "
    >
      {{ $t("_validation.field_does_not_match") }}
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { nl } from "vuejs-datepicker/dist/locale";
import InfoCircle from "../custom/InfoCircle";
export default {
  name: "VInput",
  components: {
    InfoCircle,
    Datepicker,
  },
  props: {
    label: {},
    placeholder: {},
    value: {},
    type: { default: "text" },
    required: { default: false },
    disabled: { default: false },
    copy: { default: false },
    error: {},
    suffix: {},
    prefix: {},
    datepicker: {},
    onChange: {},
    min: {},
    max: {},
    step: {},
    info: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      nl: nl,
    };
  },
  methods: {
    keyup(e) {
      if (this.type == "slug") {
        let cvalue = e.target.value
          .toLowerCase() // LowerCase
          .replace(/\s+/g, "-") // space to -
          .replace(/&/g, `-and-`) // & to and
          .replace(/--/g, `-`); // -- to -
        e.target.value = cvalue;
      }
      this.$emit("input", e.target.value);
    },
    selectedDate(value) {
      this.$emit("input", formatDate(new Date(value), "yyyy-MM-dd"));
    },
    copyURL() {
      this.selectText(this.$refs.input);
      document.execCommand("copy");
      this.$popcorn(
        "success",
        this.$t("_notifications.copied_to_clipboard_success")
      );
    },
    selectText(element) {
      let range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    clearedDate() {
      this.$emit("input", null);
    },
    onChangeEvent() {
      if (this.onChange != null) this.onChange();
    },
  },
  created() {
    if (this.type == "date") {
      this.$emit("input", formatDate(this.value, "yyyy-MM-dd"));
    }
  },
  watch: {
    value: {
      handler: function () {
        if (this.type == "date") {
          this.$emit("input", formatDate(this.value, "yyyy-MM-dd"));
        }
      },
    },
  },
};
function formatDate(x, y) {
  if (!(x instanceof Date)) return x;
  var z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds(),
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(-2);
  });
  return y.replace(/(y+)/g, function (v) {
    return x.getFullYear().toString().slice(-v.length);
  });
}
</script>

<style lang="scss" scoped>
.input-holder {
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  .input-item {
    border-radius: var(--input-border-radius);
    border-style: solid;
    border-width: var(--input-border-width);
    border-color: var(--input-border-color);
    background: var(--input-background-color);
    box-shadow: var(--input-shadow);
    margin-top: 7px;
    transition: all 0.2s;
    display: flex;
    input {
      padding: var(--input-padding);
      color: var(--input-color);
      border: none;
      font-size: var(--input-font-size);
      background: transparent;
      width: 100%;
      &::placeholder {
        color: #bbbbbb;
        font-weight: 400;
      }
      &:disabled {
        background: var(--input-disabled-background-color);
        color: #aaa;
      }
    }
    .prefix,
    .suffix {
      display: flex;
      align-items: center;
      color: #bbb;
      font-size: var(--input-font-size);
      padding: var(--input-padding);
      border-color: #eee;
      border-style: solid;
    }
    .prefix {
      border-width: 0 2px 0 0;
    }
    .suffix {
      border-width: 0 0 0 2px;
    }
  }
  .suffix.copy {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 !important;
    padding: 0 15px !important;
    span {
      font-size: 20px;
    }
  }
  .input-item.error {
    border-color: var(--input-error-border-color);
    background: var(--input-error-background-color);
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
    margin-top: 3px;
    margin-left: 2px;
    margin-bottom: -17px;
    text-align: right;
  }
}
</style>

<style lang="scss">
.vdp-datepicker {
  width: 100%;
  input {
    padding: var(--input-padding);
    color: var(--input-color);
    border: none;
    font-size: var(--input-font-size);
    background: transparent;
    width: 100%;
    &::placeholder {
      color: #bbbbbb;
      font-weight: 400;
    }
  }
}
.vdp-datepicker__calendar {
  border: 2px solid #eee !important;
  border-radius: 5px !important;
  left: -2px !important;
  padding: 15px 25px;
  width: 315px;
  &.header {
    margin-bottom: 10px;
  }
}
.vdp-datepicker__calendar .cell {
  border-radius: 4px;
}
.vdp-datepicker__calendar .cell:hover {
  border-color: var(--primary-color) !important;
}
.vdp-datepicker__calendar .cell.selected {
  color: #fff !important;
  background: var(--primary-color) !important;
}
.vdp-datepicker__calendar .cell.day,
.cell.month,
.cell.year {
  font-size: 14px;
}
.vdp-datepicker__clear-button {
  font-size: 23px;
  position: absolute;
  right: 15px;
  top: 6px;
  color: #ccc;
}
.vdp-datepicker__clear-button {
  font-weight: 100;
  font-size: 22px;
  color: #ddd;
}
.input-holder.is-disabled .vdp-datepicker input:disabled {
  background: var(--input-disabled-background-color);
  color: #aaa;
}
.input-holder.is-disabled .vdp-datepicker__clear-button {
  display: none;
}
</style>
<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const default_layout = "default";

export default {
  name: "App",

  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },

  metaInfo: {
    title: "Home",
    titleTemplate: "%s | SeeChange",
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

:root {
  /* Main colors */
  --primary-color: #f54b35;
  --secondary-color: #edae80;

  --global-p-lineheight: 170%;
  --link-color: inherit;

  /* Backgroundcolor */
  --background-color: #fbfbfb;

  /* Border */
  --border-color: #ebecee;

  /* Sidebar */
  --sidebar-border-color: var(--border-color);
  --sidebar-border-width-color: 2px;

  /* Navigation */
  --navigation-border-color: var(--border-color);
  --navigation-border-width-color: 2px;

  /* Checkbox styling */
  --checkbox-check-color: #fff;
  --checkbox-background-color: var(--primary-color);
  --checkbox-color: #eee;
  --checkbox-border-width: 2px;
  --checkbox-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --checkbox-line-heigth: 180%;

  /* Input styling */
  --input-border-radius: 5px;
  --input-color: #222;
  --input-border-width: 1px;
  --input-border-color: #eee;
  --input-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --input-background-color: #fff;
  --input-disabled-background-color: #fafafa;
  --input-font-size: 16px;
  --input-padding: 12px 16px;
  --input-error-border-color: #ffdddb;
  --input-error-background-color: #fffafa;
  --input-error-color: #ffb5b5;
  --input-error-letter-spacing: 0.2px;
  --input-error-font-size: 12px;
  --input-label-font-size: 14px;
  --input-label-font-weight: 400;
  --input-label-color: #222;

  /* Card styling */
  --card-background: #fff;
  --card-border-radius: 5px;
  --card-shadow: 2px 3px 1px rgba(0, 0, 0, 0.04);

  /* Indicator colors */
  --color-red: #ff7575;
  --color-green: #008726;
  --color-yellow: #ffc100;

  /* Button color */
  --button-background: var(--primary-color);
  --button-font-family: "Montserrat", sans-serif;
  --button-font-weight: 400;
  --button-border-radius: 5px;
  --button-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --button-color: #fff;
  --button-hover-color: #e92b2b;
  --button-transition: all 200ms ease-in-out;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: var(--background-color);
  min-height: 100vh;
  box-sizing: border-box;
}

hr {
  border: none;
  border-top: 2px solid #eeeeee;
  margin: 15px 0;
}
</style>

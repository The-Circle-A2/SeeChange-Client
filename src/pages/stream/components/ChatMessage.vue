<template>
  <div class="chat-wrapper">
    <div v-if="!info" class="chat-container">
      <div class="chat-header">
        <p class="chat-name">
          {{ name }}
        </p>
        <p class="chat-time">{{ date }}</p>
      </div>
    </div>

    <div v-if="info" class="chat-container">
      <div class="chat-header-info">
        <p class="chat-time">{{ date }}</p>
        <div class="chat-message-info" v-if="info">
          <p>
            {{ message }}
          </p>
        </div>
      </div>
    </div>

    <p v-if="!info" class="chat-message">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",

  props: {
    name: { type: String, default: null },
    date: { type: String, default: null },
    message: { type: String, default: null },
    info: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.chat-wrapper {
  margin-bottom: 15px;
  padding-right: 10px;

  .chat-container {
    display: flex;
    margin-bottom: 5px;

    .profile-avatar {
      width: 30px;
      height: 30px;
      padding-right: 15px;
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      width: calc(325px - 45px - 20px);
    }

    .chat-time {
      font-weight: 400;
      font-size: 11px;
    }

    .chat-name {
      font-weight: 600;
      font-size: 11px;
      padding-bottom: 5px;
    }
  }

  .chat-header-info {
    text-align: center;
    width: calc(325px - 45px - 20px);
  }

  .chat-message-info {
    width: 100%;
    font-size: 13px;
    text-align: center;
    margin-top: 5px;
  }

  .chat-message {
    width: 100%;
    font-size: 13px;
  }
}
</style>

<template>
  <div class="stream">
    <div class="stream-content">
      <div class="stream-container">
        <NavigateBack :to="{ name: 'dashboard' }" />
        <div class="stream-placeholder"></div>

        <div class="stream-meta">
          <p class="stream-title">{{ stream.title }}</p>
          <p class="view-count">{{ stream.viewers }}</p>
          <img src="../../../public/viewer_icon.png" class="view-icon" />
        </div>

        <Profile
          :name="stream.name"
          :followers="stream.followers"
          :city="stream.city"
          :to="{ name: 'profile' }"
        />
      </div>
    </div>
    <div class="stream-sidebar">
      <div class="container">
        <ChatMessage
          v-for="item in items"
          :key="item._id"
          :name="item.name"
          :date="item.date"
          :message="item.message"
          :info="item.info"
        />
      </div>

      <div class="chat-input-container">
        <form ref="chatBox" novalidate class="chat-form" @submit.prevent="send">
          <input
            class="chat-input"
            v-model="message"
            placeholder="send a message"
          />
          <button class="chat-submit" type="submit"></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavigateBack from "../../components/navigation/NavigateBack.vue";
import Profile from "../../components/layout/Profile.vue";
import ChatMessage from "./components/ChatMessage.vue";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import socketConnection from "../../socket/socketConnection.js";
export default {
  async created() {
    socketConnection.establishConnection(this);
  },
  beforeDestroy() {
    socketConnection.disconnect();
  },
  computed: mapGetters({
    items: "dummy/chat",
    stream: "dummy/stream",
  }),
  components: { NavigateBack, Profile, ChatMessage },
  name: "Stream",
  data() {
    return {
      message: "",
    };
  },
  validations: {
    message: {
      required,
    },
  },
  methods: {
    send() {
      console.log("Send aangeroepen");
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("niet valid");
        this.$refs.chatBox.reset();
        return;
      } else {
        socketConnection.sendMessageToServer(this.message);
        this.message = "";
      }

      this.$refs.chatBox.reset();
    },
  },
  metaInfo() {
    return { title: this.$t("_dashboard.title") };
  },
};
</script>

<style lang="scss">
.stream {
  display: flex;
  justify-content: flex-start;

  .stream-content {
    width: calc(100vw - 325px);
  }

  .stream-sidebar {
    flex: none;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: calc(100vh - 90px);
    width: 325px;
    border-left: var(--sidebar-border-width-color) solid
      var(--sidebar-border-color);
    background-color: #fff;
    padding: 20px 20px;
  }

  .container {
    overflow-y: scroll;
    word-wrap: break-word;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .stream-container {
    max-width: 1024px;
    display: block;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;

    .stream-placeholder {
      max-width: 100%;
      height: 535px;
      background-color: #c4c4c4;
      margin-bottom: 10px;
    }

    .stream-title {
      font-weight: 600;
      font-size: 18px;
      float: left;
    }

    .view-icon {
      float: right;
      width: 18px;
      height: 18px;
      padding-right: 5px;
    }

    .view-count {
      float: right;
      font-weight: 300;
      font-size: 14px;
    }

    .stream-meta {
      display: inline-block;
      width: 100%;
    }

    .streamer-info {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
    }

    .streamer-avatar {
      padding-right: 15px;
      height: 60px;
      width: 60px;
    }

    .streamer-info-text {
      display: flex;
      flex-direction: column;
    }

    .streamer-name {
      font-weight: 600;
      font-size: 14px;
    }

    .streamer-followers {
      font-weight: 600;
      font-size: 12px;
      color: #aeb3bb;
      padding-bottom: 10px;
    }

    .streamer-location {
      font-weight: 300;
      font-size: 14px;
    }
  }

  .chat-input-container {
    margin-top: auto;
  }

  .chat-form {
    width: 100%;
    color: #9f9f9f;
    height: 36px;
    padding-left: 10px;
    border: 0.5px solid #ccc;
    border-radius: 3px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .chat-input {
    border: none !important;
    flex-grow: 2 !important;
  }

  .chat-input:focus {
    outline: none;
  }

  .chat-submit {
    width: 20px;
    height: 20px;
    background: url(../../../public/send.png);
    background-repeat: no-repeat;
    border: none;
    margin-right: 10px;
  }

  .input-holder {
    padding: 0px !important;
    border-style: none !important;
    background: none;
    box-shadow: none;
    margin-top: 5px;
    height: 37px;
  }

  .input-item {
    padding: 0px !important;
    border-style: none !important;
    box-shadow: none;
    margin-top: 5px;
    height: 37px;
  }
}
</style>

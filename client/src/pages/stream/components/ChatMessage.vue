<template>
<div class="chat-wrapper">
    <div class="chat-container">
    <img src="../../../../public/avatar.png" class="profile-avatar">
    
    <div class="chat-text">
        <p class="chat-name">{{ name }} <span class="chat-time">{{ date }}</span></p>
        <p class="chat-message">{{ message }}</p>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: "ChatMessage",

  props: {
    name: { type: String, default: null },
    date: { type: String, default: null },
    message: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
    .chat-wrapper{
        margin-bottom: 10px;
    }
    .chat-container{
        display: flex;
        flex-direction: row;
        padding-right: 20px;


        .profile-avatar{
            width: 30px;
            height: 30px;
            padding-right: 15px;
        }

        .chat-text{
            display: flex;
            flex-direction: column;
        }

        .chat-name{
            font-weight: 600;
            font-size: 11px;
            padding-bottom: 5px;
        }

        .chat-time{
            float: right;
        }

        .chat-message{
            width: 100%;
            font-size: 13px;
        }
    }
</style>
import store from "../../store";

export const state = {
  streamlist: [
    {
      _id: 1,
      title: "TEST TEST TEST TEST TEST TEST TEST TEST TEST",
      name: "John Doe",
      city: "city",
      streamer_id: 1,
    },
    {
      _id: 2,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Ben Dover",
      city: "city",
      streamer_id: 2,
    },
    {
      _id: 3,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Dees Nuts",
      city: "Kaas",
      streamer_id: 3,
    },
    {
      _id: 4,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Erik Jan",
      city: "city",
      streamer_id: 4,
    },
    {
      _id: 5,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Erik Jan",
      city: "city",
      streamer_id: 5,
    },
  ],
  following: [
    {
      _id: 1,
      viewers: 1234,
      name: "John Doe",
      city: "city",
    },
    {
      _id: 2,
      viewers: 4321,
      name: "Ben Dover",
      city: "city",
    },
    {
      _id: 3,
      viewers: 2134,
      name: "Dee Znuts",
      city: "village",
    },
  ],
  streamInfo: {
    _id: 1,
    title: "Stream in Rotterdam",
    viewers: "12345",
    name: "Karen Jansen",
    followers: "12345",
    city: "Rotterdam",
    streamer_id: 1,
  },
  chatMessages: [
    // {
    //   _id: 1,
    //   name: "Piet Jan",
    //   date: "01-01-01 11:11",
    //   message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
    // {
    //   _id: 2,
    //   name: "Piet Jan",
    //   date: "01-01-01 11:11",
    //   message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
    // {
    //   _id: 3,
    //   name: "Piet Jan",
    //   date: "01-01-01 11:11",
    //   message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
  ],
  user: {
    _id: 1,
    name: "John Doe",
  },
  single: {},
};

export const getters = {
  streams: (state) => state.streamlist,
  following: (state) => state.following,

  stream: (state) => state.streamInfo,
  chat: (state) => state.chatMessages,
  user: (state) => state.user,
  single: (state) => (id) => {
    return store.findItem(state.streamlist, id);
  },
};

export const actions = {};

export const mutations = {};

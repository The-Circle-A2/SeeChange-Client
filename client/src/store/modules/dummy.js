export const state = {
  streamlist: [
    {
      _id: 1,
      title: "TEST TEST TEST TEST TEST TEST TEST TEST TEST",
      name: "John Doe",
      city: "city",
    },
    {
      _id: 2,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Ben Dover",
      city: "city",
    },
    {
      _id: 3,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Dees Nuts",
      city: "Kaas",
    },
    {
      _id: 4,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Erik Jan",
      city: "city",
    },
    {
      _id: 5,
      title: "Lorum ipsum jayke mofu duval rept wuga...",
      name: "Erik Jan",
      city: "city",
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
  user: [
    {
      _id: 1,
      name: "John Doe",
    },
  ],
};

export const getters = {
  streams: (state) => state.streamlist,
  following: (state) => state.following,
  user: (state) => state.user,
};

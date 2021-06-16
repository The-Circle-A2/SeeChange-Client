export const state = {
    streamInfo: [
      {
        _id: 1,
        title: "Stream in Rotterdam",
        viewers: "12345",
        name: "Karen Jansen",
        followers: "12345", 
        city: "Rotterdam",
      },
    ],
  };
  
export const getters = {
    stream: (state) => state.streamInfo,
};
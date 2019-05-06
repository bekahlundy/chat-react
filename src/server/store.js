const uuid = require("uuid");

const userStore = [];
const messageStore = [];

const addNewMessage = (author, message) => {
  const newMessage = {
    author,
    id: uuid.v4(),
    message
  };
  messageStore.push(newMessage);
  return newMessage;
};

const addNewUser = userName => {
  const newUser = {
    user: userName,
    id: uuid.v4()
  };
  userStore.push(newUser);
  return newUser;
};

const dropUser = currentUser => {
  let i = userStore.findIndex(usr => usr.user === currentUser);
  userStore.splice(i, 1);
  return userStore;
};

const getCurrentMessages = () => messageStore;

const getCurrentUsers = () => userStore;

module.exports = {
  addNewUser,
  addNewMessage,
  dropUser,
  getCurrentMessages,
  getCurrentUsers
};

## About

I used [Create React App](https://github.com/facebook/create-react-app), [Socket.io](https://socket.io/), and [Express](https://expressjs.com/en/guide/routing.html) to create this chat app.

I built this chat app inspired by the chat apps that you must enter a name before getting into the app. Almost like your username will unlock the chat for you.

I used sockets to listen for when a user is added, a message is added, a user is dropped, ect. in real time.

I chose to use create-react-app as it is fast way to set up a react app. Along with this, I used the [React Testing Library](https://testing-library.com/docs/dom-testing-library/intro), another new thing I recently learned. React testing library has proven for me to be a great way to thoroughly test UI components by simply taking "snapshots" of what your components look like and watching for changes in the future.

For the backend I used express and an object storage to hold all data. Since this is a small application, I felt as though keeping the data in a store object would suffice.

## How to use

When you get to the app enter your username and it will bring you to a new component, the chat box. You will be able to see all current users and the messages they are exchanging. When you leave the chat, your name will disappear from the current users list.

## How to run in dev mode
- `$ npm i` to install dependencies.
- `$ npm start` in a terminal, this will launch [http://localhost:3000/](http://localhost:3000/)
- `$ nodemon app.js` in a different terminal window **in the server folder** (chat/src/server). This will launch [http://localhost:8080/](http://localhost:8080/)
- you will be able to view the app and play around on [http://localhost:3000/](http://localhost:3000/)

## How to attempt to run built app
- `$ npm build` to install dependencies.
- `$ serve -s build` in a terminal, this will launch [http://localhost:5000/](http://localhost:5000/)
- A note about the built app. **This is not currently working. You will have to view the functionality of the app in dev mode.** The app is up and running, but when interacting with the sockets, I continue to get errors regarding the websocket connection. I imagine with some more time and reading I would be able to figure out this issue, but for the time being, this would be the point where I start asking a coworker for some help to learn a deeper understanding of what I am missing.

## Tests
- `npm run test` to test the client
  - **Note:** you will see four tests that are being skipped. They are in the EnterChat.test.js file and AddMessage.test.js file. They are all related to testing that the submit functionality is called when you hit the enter button, instead of having to click the button on the page. This requires using react-testing-library's `fireEvent.keyUp()` method. Unfortunately, it seems that this method is a bit buggy and I have found a lot of people including myself are not able to get this method to work with the tests. So for now I have left them skipped, this is something I would love to come back to
  - I also did not yet get to test the axios calls and with socket.io code in Chat.js, using axios and socket.io slowed me down from finishing these tests, but again, something I would like to come back to. I would like to test all of the functions and calls.
- Other notes: I had a harder time connecting the server tests and running those, so that is something I would like to get to next.

## Other notes
**Things I would work on next if I had more time:**

  - More thorough api and socket.io/axios tests, these were a bit harder to wrap my head around. I think with using socket.io for the first time, a pair on writing these tests would be ideal for me, if not just a good chunk of time reading and learning and practicing a bit more. Same goes for mocking out axios calls for testing.
  - Add functionality for a little notification/message "x user has joined/left the chat" message when a user joins/leaves, I think it would add a nice touch
  - A lot of css changes, the css was thrown together to just make something that resembled a message app. So there are a lot of little issues. ie. would like to implement sass, there is no accommodation for really long strings (message or user text), the scrollbar does not autoscroll to the bottom while messages are added, etc.
  - Make a few functions cleaner and bug proof. For example, in the store there is a dropUser function. This function works for my simple app, but in production there would be a lot more concerns. The first one I thought of is "what happens if two users have the same string for their name"? I would like to add test cases and functionality to really dig into anything I have missed in situations like these
  - Use TypeScript. We used TypeScript at my last job and I really enjoyed it. I think that is leads to cleaner, easier to read, code. It also helps with preventing bugs with typecasting.
  - Use a real database rather than an object I created as a store
  - Look into my components a bit more and change some of them to stateless components rather than pure components with the constructor

// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// const PORT = 5000;

// io.on("connection", (socket) => {
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("call ended");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => io.to(data.to).emit("callAccepted"), data.signal);
// });

// server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))
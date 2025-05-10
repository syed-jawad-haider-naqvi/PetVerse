// import express from "express";
// import { sendMessage, getMessages, markAsSeen } from "../controllers/MessageController.js";
// import authUser from "../middlewares/authUser.js";
// import authVet from "../middlewares/authVet.js";

// const messageRouter = express.Router();

// // Middleware to check authentication type (User or Vet)
// const authenticate = (req, res, next) => {
//     if (req.headers.token) {
//         return authUser(req, res, next); // Authenticate Users
//     } else if (req.headers.dtoken) {
//         return authVet(req, res, next); // Authenticate Vets
//     } else {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// };

// // Send a message (Both Users & Vets)
// messageRouter.post("/", authenticate, sendMessage);

// // Get messages for a chat (Both Users & Vets)
// messageRouter.get("/:chatId", authenticate, getMessages);

// // Mark a message as seen (Both Users & Vets)
// messageRouter.patch("/seen/:messageId", authenticate, markAsSeen);

// export default messageRouter;

import express from "express";
import { sendMessage, getMessages} from "../controllers/MessageController.js";

const messageRouter = express.Router();

// Send a message (Both Users & Vets) - No Authentication
messageRouter.post("/", sendMessage);

// Get messages for a chat (Both Users & Vets) - No Authentication
messageRouter.get("/:chatId", getMessages);


export default messageRouter;

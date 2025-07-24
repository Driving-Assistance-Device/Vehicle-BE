import { userSignUp } from "../services/user.service.js";

export const handleSocketMessage = async (message) => {
  const { type, payload } = message;

  switch (type) {
    case "USER:SIGNUP":
      return await userSignUp(payload);

    default:
      throw new Error("Unknown message type");
  }
};

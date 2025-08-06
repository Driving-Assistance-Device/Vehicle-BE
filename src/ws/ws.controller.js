import {
  drivingStart,
  updateDrivingMileage,
  updateDrivingEyes,
  drivingStatus,
  drivingStop,
} from "../services/driving.service.js";
export const handleSocketMessage = async (message, userId) => {
  const { type, payload } = message;

  switch (type) {
    case "DRIVING:START":
      return await drivingStart(payload, userId);
    case "DRIVING:STATUS":
      return await drivingStatus(payload);
    case "DRIVING:STOP":
      return await drivingStop(payload);
    case "DRIVING:MILEAGE":
      return await updateDrivingMileage(payload);
    case "DRIVING:EYES":
      return await updateDrivingEyes(payload);
    default:
      throw new Error("Unknown message type");
  }
};

export const handleTestSocket = async (message) => {
  const { type, payload } = message;

  switch (type) {
    case "SOCKET:TEST":
      return { status: "success", message: "Test message received" };
    default:
      throw new Error("Unknown test message type");
  }
};

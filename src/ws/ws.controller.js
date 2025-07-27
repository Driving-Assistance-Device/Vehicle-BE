export const handleSocketMessage = async (message) => {
  const { type, payload } = message;

  switch (type) {
    case "DRIVING:STATUS":
      // Handle driving status update
      // return await handleDrivingStatusUpdate(payload);
      break;
    case "DRIVING:MILEAGE":
      // Handle mileage update
      // return await handleMileageUpdate(payload);
      break;
    case "DRIVING:EYES":
      // Handle eyes update
      // return await handleEyesUpdate(payload);
      break;
    default:
      throw new Error("Unknown message type");
  }
};

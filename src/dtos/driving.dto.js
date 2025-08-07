export const responseFromDrivingStart = ({ driving, device }) => {
  return {
    deviceId: device.id,
    status: device.status,
    mileage: 0,
    startTime: driving.startTime,
    endTime: driving.endTime,
    left: 0,
    right: 0,
    front: 0,
    createdAt: driving.createdAt,
  };
};

export const responseFromDrivingStatus = ({ payload, device, driving }) => {
  return {
    deviceId: device.id,
    status: device.status,
    mileage: payload.mileage,
    startTime: driving.startTime,
    endTime: new Date(),
    left: payload.left,
    right: payload.right,
    front: payload.front,
  };
};

export const responseFromDrivingStop = ({ driving, device, eyes }) => {
  return {
    drivingId: driving.id,
    status: device.status,
    mileage: driving.mileage,
    startTime: driving.startTime,
    endTime: driving.endTime,
    left: eyes.left,
    right: eyes.right,
    front: eyes.front,
  };
};

export const responseFromDriving = ({ driving }) => {
  return {
    drivingId: driving.id,
    mileage: driving.mileage,
    startTime: driving.startTime,
    endTime: driving.endTime,
    createdAt: driving.createdAt,
  };
};

export const responseFromDrivings = ({ drivings }) => {
  return drivings.map((driving) => ({
    drivingId: driving.id,
    mileage: driving.mileage,
    startTime: driving.startTime,
    endTime: driving.endTime,
    createdAt: driving.createdAt,
  }));
};

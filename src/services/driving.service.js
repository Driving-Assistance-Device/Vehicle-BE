import {
  responseFromDrivingStart,
  responseFromDrivingStatus,
  responseFromDrivingEnd,
} from "../dtos/driving.dto.js";
import {
  addDriving,
  getDriving,
  updateDriving,
  addDevice,
  getDevice,
  updateDevice,
  addEyes,
  getEyes,
} from "../repositories/driving.repository.js";

export const drivingStart = async (payload, userId) => {
  // 1. Id 값이 유효한지 확인
  const { deviceId } = payload;
  if (!deviceId) {
    throw new Error("Device ID is required to start driving.");
  }

  // 2. deviceId로 디바이스 정보를 가져옴
  const device = await getDevice(deviceId);

  // 디바이스가 존재하는지 확인
  if (!device) {
    throw new Error("Device not found.");
  }
  // 디바이스가 사용 중인지 확인
  if (device.status === 1) {
    throw new Error("Device is already in use.");
  }

  // 3. 디바이스 상태를 true로 업데이트
  const updateData = {
    id: device.id,
    status: true,
  };

  const updatedDevice = await updateDevice(updateData);

  // 4. driving 생성 (주행 시작 알림)
  const data = {
    deviceId: device.id,
    userId: userId,
  };
  const drivingId = await addDriving(data);
  const driving = await getDriving(drivingId);

  return responseFromDrivingStart({
    driving,
    device: updatedDevice,
  });
};

export const drivingStatus = async (payload) => {
  // 1. payload 값이 정상적으로 다 들어오는 지 확인한다.
  const { drivingId, mileage, left, right, front } = payload;
  if (!(drivingId && mileage >= 0 && left >= 0 && right >= 0 && front >= 0)) {
    throw new Error(
      "All fields are required: drivingId, mileage, left, right, front."
    );
  }

  // 2. drivingId로 driving을 가져옴
  const driving = await getDriving(drivingId);
  if (!driving) {
    throw new Error("Driving not found.");
  }

  // 3. deviceId로 디바이스 정보를 가져옴
  const device = await getDevice(driving.deviceId);
  if (!device.status === 0) {
    throw new Error("Device is not currently in use.");
  }

  // 4. 정상적이면 프론트에서 주행 상태를 업데이트 함.
  return responseFromDrivingStatus({
    payload,
    device,
    driving,
  });
};

export const drivingStop = async (payload) => {
  // 1. payload 값이 정상적으로 다 들어오는 지 확인한다.
  const { drivingId, mileage, left, right, front } = payload;
  if (!(drivingId && mileage && left && right && front)) {
    throw new Error(
      "All fields are required: drivingId, mileage, left, right, front."
    );
  }

  // 2. 2. drivingId로 driving을 가져옴
  const driving = await getDriving(drivingId);
  if (!driving) {
    throw new Error("Driving not found.");
  }

  // 3. deviceId로 디바이스 정보를 가져옴
  const device = await getDevice(driving.deviceId);
  if (!device.status === 0) {
    throw new Error("Device is not currently in use.");
  }

  // 4. device 상태를 종료 상태로 업데이트
  const updateDeviceData = {
    id: device.id,
    status: false,
  };
  const updatedDevice = await updateDevice(updateDeviceData);

  // 5. 주행 종료로 데이터를 DB에 업데이트
  const updateDrivingData = {
    id: driving.id,
    mileage,
    bias: (right - left) / (left + right),
    endTime: new Date(),
  };
  const updatedDriving = await updateDriving(updateDrivingData);

  // 6. 눈 상태를 DB에 추가
  const data = {
    drivingId: driving.id,
    left,
    right,
    front,
  };
  const eyesId = await addEyes(data);
  const eyes = await getEyes(eyesId);
  if (!eyes) {
    throw new Error("Eyes data not found.");
  }

  return responseFromDrivingEnd({
    device: updatedDevice,
    driving: updatedDriving,
    eyes,
  });
};

export const updateDrivingMileage = async (payload) => {};

export const updateDrivingEyes = async (payload) => {};

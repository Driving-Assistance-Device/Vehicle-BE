import { prisma } from "../db.config.js";

export const addDriving = async (data) => {
  const created = await prisma.driving.create({ data: data });
  return created.id;
};

export const getDriving = async (drivingId) => {
  const driving = await prisma.driving.findFirstOrThrow({
    where: { id: drivingId },
  });
  return driving;
};

export const updateDriving = async (data) => {
  const updated = await prisma.driving.update({
    where: { id: data.id },
    data: data,
  });
  return updated;
};

export const addDevice = async (data) => {
  const created = await prisma.device.create({ data: data });
  return created.id;
};

export const getDevice = async (deviceId) => {
  const device = await prisma.device.findFirstOrThrow({
    where: { id: deviceId },
  });
  return device;
};

export const updateDevice = async (data) => {
  console.log(data);
  const updated = await prisma.device.update({
    where: { id: data.id },
    data: data,
  });
  return updated;
};

export const addEyes = async (data) => {
  const created = await prisma.eyes.create({ data: data });
  return created.id;
};

export const getEyes = async (eyesId) => {
  const eyes = await prisma.eyes.findFirstOrThrow({
    where: { id: eyesId },
  });
  return eyes;
};

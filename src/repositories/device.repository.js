import { prisma } from "../db.config.js";
export const addDevice = async (data) => {
    const device = await prisma.device.create({
        data: {
            code: data.code,
            status: data.status,
        },
    });
    return device.id;
}

export const getDevice = async (deviceId) => {
    const device = await prisma.device.findUnique({
        where: { id: deviceId },
    });
    if (!device) {
        return null;
    }
    return device;
}

export const getDevices = async () => {
    const devices = await prisma.device.findMany();
    
    return devices;
}

export const getDeviceByCode = async (code) => {
    const device = await prisma.device.findFirst({
        where: { code: code },
    });
    if (!device) {
        return null;
    }
    return device;
}

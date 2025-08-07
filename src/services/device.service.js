import { getDeviceByCode, addDevice, getDevice, getDevices } from "../repositories/device.repository.js";
import { responseFromDevice, responseFromDevices } from "../dtos/device.dto.js";
export const deviceHello = async (payload) => {
    if(payload && payload.code) {
        const device = await getDeviceByCode(payload.code);
        if(device) {
           return responseFromDevice({ device });
        }
        console.log("디바이스 없음 -> 새로 등록")
        const data = {
            code: payload.code,
            status: 0, // 초기 상태는 false로 설정
        }
        const deviceId = await addDevice(data);
        const newDevice = await getDevice(deviceId);
        return responseFromDevice({ device: newDevice });
    }
}

export const deviceList = async () => {
    const devices = await getDevices();
    return responseFromDevices({ devices });
}
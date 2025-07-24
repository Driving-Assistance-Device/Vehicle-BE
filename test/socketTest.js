import dotenv from "dotenv";
dotenv.config();

import { handleSocketMessage } from "../src/ws/ws.controller.js";
import { prisma } from "../src/db.config.js";

const runTest = async () => {
  try {
    const payload = {
      email: `test${Date.now()}@example.com`,
      name: "Test User",
      username: "testuser",
      password: "securepass",
      avatar: "https://example.com/avatar.png",
    };

    const message = {
      type: "USER:SIGNUP",
      payload,
    };

    const response = await handleSocketMessage(message);
    console.log("✅ WebSocket 응답 결과:");
    console.log(response);

    const dbUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    console.log("🧾 DB 저장 확인:");
    console.log(dbUser);
  } catch (err) {
    console.error("❌ 테스트 중 오류 발생:", err.message);
  } finally {
    await prisma.$disconnect();
  }
};

runTest();

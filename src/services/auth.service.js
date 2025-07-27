import { responseFromUser } from "../dtos/user.dto.js";
import { addUser, getUser } from "../repositories/user.repository.js";
import {
  getUserSignIn,
  updateUserRefresh,
  getUserRefresh,
} from "../repositories/auth.repository.js";
import { DuplicateUserEmailError } from "../errors.js";
import { responseFromAuth } from "../dtos/auth.dto.js";
import { createJwt } from "../utils/jwt.util.js";

export const signUp = async (data) => {
  console.log(data);
  const UserId = await addUser({
    email: data.email,
    name: data.name,
    password: data.password,
  });

  if (UserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  const user = await getUser(UserId);
  return responseFromUser({
    user,
  });
};

export const signIn = async (data) => {
  const user = await getUserSignIn({
    email: data.email,
    password: data.password,
  });
  if (user === null) {
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  }
  const accecsToken = createJwt({ userId: user.id, type: "AT" });
  const refreshToken = createJwt({ userId: user.id, type: "RT" });

  await updateUserRefresh(user.id, refreshToken);
  const auth = {
    id: user.id,
    name: user.name,
    accessToken: accecsToken,
    refreshToken: refreshToken,
  };

  return responseFromAuth({
    auth,
  });
};

export const signOut = async (userId) => {
  const user = await updateUserRefresh(userId, null);
  if (user === null) {
    throw new Error("로그아웃에 실패했습니다.");
  }
  return responseFromUser({
    user,
  });
};

export const refresh = async (data) => {
  const user = await getUserRefresh({
    refreshToken: data.refreshToken,
  });
  if (user === null) {
    throw new Error("유효하지 않은 리프레시 토큰입니다.");
  }
  const accessToken = createJwt({ userId: user.id, type: "AT" });
  const refreshToken = createJwt({ userId: user.id, type: "RT" });
  await updateUserRefresh(user.id, refreshToken);
  const auth = {
    id: user.id,
    name: user.name,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return responseFromAuth({
    auth,
  });
};

export const bodyToSignUp = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};
export const bodyToSignIn = (body) => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const bodyToRefresh = (body) => {
  return {
    refreshToken: body.refreshToken,
  };
};

export const responseFromUser = ({ user }) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    refreshToken: user.refreshToken,
    createdAt: user.createdAt,
  };
};

export const responseFromAuth = ({ auth }) => {
  return {
    id: auth.id,
    name: auth.name,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  };
};

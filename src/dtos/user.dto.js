export const bodyToUser = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};
export const responseFromUser = ({ user }) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    hashedRefreshToken: user.hashedRefreshToken || null,
    createdAt: user.createdAt,
  };
};

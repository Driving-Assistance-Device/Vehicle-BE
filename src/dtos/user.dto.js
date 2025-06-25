export const bodyToUser = (body) => {
    return {
        email: body.email,
        name: body.name,
        username: body.username,
        password: body.password,
        avator: body.avatar || null,
    }
};
export const responseFromUser = ({ user }) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        password: user.password,
        avator: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
};
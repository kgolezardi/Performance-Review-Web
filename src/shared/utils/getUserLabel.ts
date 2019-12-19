export const getUserLabel = (user: {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
}) => {
  const name = (user.firstName + ' ' + user.lastName).trim();
  if (name) {
    return name;
  }

  return user.username;
};

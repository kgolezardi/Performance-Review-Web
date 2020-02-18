export type UserType = {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
};

export const getUserLabel = (user: UserType) => {
  const name = (user.firstName + ' ' + user.lastName).trim();
  if (name) {
    return name;
  }

  return user.username;
};

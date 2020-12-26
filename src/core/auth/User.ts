export type User = {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatarUrl: string | null;
  readonly id: string;
  readonly isManager: boolean;
  readonly hasStarted: boolean | null;
  readonly ranking1: string | null;
  readonly ranking2: string | null;
  readonly shortUserLabel: string;
  readonly userLabel: string;
};

export class AuthResponseUserDto {
  user: {
    id: number;
    phoneNumber: string;
  };
  token: string;
}

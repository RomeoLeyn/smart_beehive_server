export class CreateResponseUserDto {
  user: {
    id: number;
    phoneNumber: string;
  };
  token: string;
}

export class UserResponseDto {
  id?: number;
  phoneNumber?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

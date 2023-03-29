export class RegistrationDTO {
  userId: string;
  token: string;
  expiredAt: Date;

  constructor(params: { userId: string; token: string; expiredAt: Date }) {
    this.userId = params.userId;
    this.token = params.token;
    this.expiredAt = params.expiredAt;
  }
}

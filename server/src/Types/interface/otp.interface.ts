export interface IOtp {
  hashedOtp: string;
  expiresAt: Date;
  phoneNumber: string;
  createdAt: Date;
  attemptCount?: number;
}

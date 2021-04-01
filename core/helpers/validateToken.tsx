import dayjs from 'dayjs';

export enum TokenStatus {
  expired = 'expired',
  renew = 'renew',
  valid = 'valid',
}

export const validateToken = (expires_at: string, renew_by: string) => {
  if (dayjs(expires_at).diff(dayjs(), 'day') < 1) {
    return TokenStatus.expired;
  }
  if (dayjs(renew_by).diff(dayjs(), 'day') < 1) {
    return TokenStatus.renew;
  }
  return TokenStatus.valid;
};

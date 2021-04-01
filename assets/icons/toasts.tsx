import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ToastSuccess = () => (
  <Svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <Path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m-1 14.5l7-7-1.41-1.41L11 13.67l-3.09-3.08L6.5 12l4.5 4.5z" />
  </Svg>
);

export const ToastWarning = ({
  fill,
  size,
}: {
  fill?: string;
  size?: number;
}) => (
  <Svg
    width={size || '20'}
    height={size || '20'}
    fill={fill || '#ffffff'}
    viewBox="0 0 24 24"
  >
    <Path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z" />
  </Svg>
);

export const ToastError = () => (
  <Svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <Path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </Svg>
);

export const ToastInfo = () => (
  <Svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
    <Path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </Svg>
);

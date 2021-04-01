import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../core/theme';

type Props = {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const CloseIcon = ({
  width = 14,
  height = 14,
  fill = theme.colors.textPrimary,
}: Props) => (
  <Svg viewBox="0 0 13 13" width={width} height={height} fill={fill}>
    <Path d="M11.7 12.8L6.5 7.5l-5.2 5.3a.7.7 0 01-1-1l5.2-5.3L.2 1.3a.7.7 0 011-1l5.3 5.2L11.7.2a.7.7 0 111 1L7.6 6.6l5.3 5.2a.7.7 0 11-1 1z" />
  </Svg>
);

export default memo(CloseIcon);

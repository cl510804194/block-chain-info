import React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Tooltip } from '@mui/material';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';

import { buttonHover } from '@/utils/style';

export interface BlockItemProps {
  label: string;
  labelDesc?: string;
  value?: string;
  copyInfo?: string;
}
export default function BlockItem({ label, labelDesc, value = '', copyInfo = '' }: BlockItemProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  return (
    <Stack direction="row" spacing={0} sx={{ justifyContent: 'space-between', paddingRight: '25px' }}>
      <Tooltip title={labelDesc} followCursor>
        <Box sx={{ fontSize: 14, color: 'rgb(0, 0, 0)', fontWeight: 600 }}>{label}</Box>
      </Tooltip>

      <Box
        sx={{ fontSize: 14, color: 'rgb(153, 153, 153)', ...(copyInfo ? buttonHover : {}) }}
        onClick={() => {
          if (copyInfo) {
            copyToClipboard(copyInfo);
            toast('Copy succeeded');
          }
        }}>
        {value || '--'} {copyInfo ? '📋' : ''}
      </Box>
    </Stack>
  );
}

import React, { ChangeEvent } from 'react';
import { Avatar, Pagination, Skeleton, Stack } from '@mui/material';

import TxItem from '@/components/TxItem';
import { useRawBlock } from '@/context/BlockInfoContext';
import usePagination from '@/hooks/usePagination';
import px2vw from '@/utils/px2vw';

const placeHolderArray = Array.from({ length: 10 }, (_, index) => index + 1);

function Transactions() {
  const { data, loading } = useRawBlock();
  const { currentData, currentPage, pageSize, page, setCurrentPage } = usePagination(data?.tx);
  //   console.log(currentData);

  const handlePaginationChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const renderItem = () => {
    return (currentData || []).map((item, index) => {
      return <TxItem key={item.hash} data={{ ...item, index: (currentPage - 1) * pageSize + index }} />;
    });
  };
  const renderLoading = () => {
    return placeHolderArray.map((item) => {
      return (
        <Stack
          key={item}
          direction="column"
          sx={{ height: '53px', border: '1px solid rgb(238, 238, 238)', padding: '5px', borderRadius: '10px' }}
          spacing={1}>
          <Skeleton variant="circular" height={20} width={20}>
            <Avatar />
          </Skeleton>
          <Skeleton variant="rectangular" width="100%" height={20} />
        </Stack>
      );
    });
  };
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={[
        { flex: 1 },
        (theme) => {
          return {
            [theme.breakpoints.down('md')]: {
              // flexDirection: 'column',
              // padding: px2vw(10),
              padding: px2vw(10),
            },
          };
        },
      ]}>
      {loading ? (
        renderLoading()
      ) : (
        <>
          {renderItem()}
          <Pagination count={page} page={currentPage} onChange={handlePaginationChange} />
        </>
      )}
    </Stack>
  );
}
export default Transactions;

import * as React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

import { RawBlockContext } from '@/context/BlockInfoContext';
import BlockDetails from '@/components/BlockDetail';
import Transactions from '@/components/Transcations';
import BlockIntroduce from '@/components/BlockIntroduce';

import { getRawBlock } from '@/apis';
import storage from '@/utils/storage';
import px2vw from '@/utils/px2vw';

import { RowBlock } from '@/types';

const storagePrefix = 'raw-block';
const fetchKey = '/rowBlock';

function Home() {
  const [search, setSearch] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error } = useSWR(
    shouldFetch ? [fetchKey, search] : null,
    (_, blockHash) => {
      return getRawBlock({ blockHash });
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );
  const [finalData, setFinalData] = useState<RowBlock | undefined>(undefined);

  const fetchLoading = !error && !finalData;

  const handleKeyDown = debounce(async (e: any) => {
    const value = e.target.value;
    if (!value) return;
    if (e.keyCode === 13) {
      const localData = (await storage.getItem(`${storagePrefix}-${value}`)) as RowBlock;

      if (localData) {
        setSearch(value);
        setShouldFetch(false);
        setFinalData(localData);
      } else {
        setFinalData(undefined);
        setShouldFetch(true);
        setSearch(e.target.value);
      }
    }
  }, 200);

  useEffect(() => {
    if (data) {
      storage.setItem(`${storagePrefix}-${search}`, data);
      setFinalData(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Not find this block');
    }
  }, [error]);

  return (
    <Box
      sx={[
        { display: 'flex', flexDirection: 'column', padding: '20px' },
        (theme) => {
          return {
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              padding: px2vw(10),
            },
          };
        },
      ]}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth label="Search Blockchain" variant="standard" onKeyDown={handleKeyDown} />
      </Box>
      <RawBlockContext.Provider value={{ data: finalData, loading: fetchLoading }}>
        {!search ? (
          <Box sx={{ textAlign: 'center' }}>please input block address</Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', color: 'red' }}>404 Not found</Box>
        ) : (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
            sx={[
              { width: '100%', padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '8px' },
              (theme) => {
                return {
                  [theme.breakpoints.down('md')]: {
                    padding: px2vw(0),
                    borderRadius: px2vw(8),
                  },
                };
              },
            ]}>
            <Stack direction="column" sx={{ flex: 1 }}>
              {/* introduce */}
              <BlockIntroduce />
              {/* details */}
              <BlockDetails />
            </Stack>
            {/* transctions */}
            <Transactions />
          </Stack>
        )}
      </RawBlockContext.Provider>
    </Box>
  );
}

export default Home;

import { useMemo, useState } from 'react';
const defaultPageSize = 10;

function usePagination<T = any>(data: T[] | undefined | null, pageSize = defaultPageSize, isReserve = false) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentDataTotal = currentPage * pageSize;

  const dataLength = (data || []).length;

  const isOver = currentDataTotal >= dataLength;
  const page = Math.ceil(dataLength / pageSize);
  const currentData = useMemo(() => {
    if (!data) return [];
    return (data || []).slice(isReserve ? 0 : (currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, data]);

  const handlePagination = () => {
    if (isOver) return;
    setCurrentPage(currentPage + 1);
  };
  const reset = () => {
    setCurrentPage(1);
  };

  return {
    isOver, // current data is over max total?
    currentPage,
    currentData,
    pageSize,
    page,
    total: dataLength,
    handlePagination,
    setCurrentPage,
    reset,
  };
}

export default usePagination;

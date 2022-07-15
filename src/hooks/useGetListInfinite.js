import { useInfiniteQuery } from 'react-query';

function useGetListInfinite(queryKey, callApi, ...apiParams) {
    const getMoreList = ({ pageParam = 1 }) => {
        return callApi(pageParam, ...apiParams);
    };

    const { isLoading, isError, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
        [queryKey, ...apiParams],
        getMoreList,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.page < lastPage.total_pages && lastPage.page + 1;
            },
            enabled: !!apiParams,
        },
    );

    const result = isSuccess ? data.pages : [];

    return {
        isLoading,
        isError,
        isSuccess,
        result,
        hasNextPage,
        fetchNextPage,
    };
}

export default useGetListInfinite;

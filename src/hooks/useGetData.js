import { useQuery } from 'react-query';

function useGetData(queryKey, callApi, ...apiParams) {
    const handleCallApi = () => {
        return callApi(...apiParams);
    };

    const { data, isError, isLoading, isSuccess } = useQuery([queryKey, ...apiParams], handleCallApi, {});

    return {
        data,
        isError,
        isLoading,
        isSuccess,
    };
}

export default useGetData;

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    //FILTER
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: 'status', value: filterValue };

    //SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    //PAGINATION
    const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

    //FETCH
    const { 
        isLoading, 
        data: { data: bookings, count } = {}, 
        error } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    })

    //PRE-FETCH
    const pageCount = Math.ceil(count / PAGE_SIZE);
    
    //NEXT
    if(page<pageCount)
    queryClient.prefetchQuery( 
        {queryKey: ['bookings', filter, sortBy, page+1],
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        }
    );

    //PREV
    if(page>1)
    queryClient.prefetchQuery( 
        {queryKey: ['bookings', filter, sortBy, page - 1],
    queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        }
    );

    return { bookings, isLoading, error, count }
}
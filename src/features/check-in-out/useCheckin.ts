import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate: checkin, isPending: isCheckinIn} = useMutation({
        mutationFn: (bookingId) => 
        updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
        }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        }
    });
    return {checkin, isCheckinIn}
}
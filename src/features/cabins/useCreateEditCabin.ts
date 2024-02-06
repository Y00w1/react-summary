import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, updateCabin } from "../../services/apiCabins";

export function useCreateEditCabin(isEditing: boolean){
    const queryClient = useQueryClient();
    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: isEditing ? updateCabin : createCabin,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['cabins'],
          });
          toast.success(isEditing ? 'Cabin uploaded!' : 'Cabin created!');
        },
        onError: (err) => toast.error(err.message),
      });
      return{mutate,isLoading}
}
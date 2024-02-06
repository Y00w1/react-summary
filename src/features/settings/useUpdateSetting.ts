import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting(){
    const queryClient = useQueryClient();

    const {mutate, isPending:isLoading, error} = useMutation({
        mutationFn: updateSetting,
        onSuccess: ()=>{
            toast.success('Setting updated succesfully!');
            queryClient.invalidateQueries({
                queryKey:['settings']
            });
        },
        onError: (err) =>{
            toast.error('Setting could not be updated ' + err.message)
        }
    });

    return {mutate,isLoading, error}
}
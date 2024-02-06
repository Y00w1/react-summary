import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const navigate = useNavigate();
    const {mutate: login, isPending: isLogingIn} = useMutation({
        mutationFn: ({email, password}: {email:string, password: string}) => loginApi({email, password}),
        onSuccess: () => {
            toast.success("Login successful");
            navigate("/");
        },
        onError: (err) => {
            console.log(err);
            toast.error("Login failed")
        }
    });
    return {login, isLogingIn};
}
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute() {
    const navigate = useNavigate();

    //Load auth user
    const {isAuthenticated, isLoading} = useUser();

    //If there is no auth user, redirect to login
    useEffect(()=>{
        if(!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return (
        <FullPage>
            <Spinner/>
        </FullPage>
    )

    if (isAuthenticated) return <Outlet />;
}
export default ProtectedRoute;

import CalculationsTable from "./CalculationsTable/CalculationsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const CalculationsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/units")
        }
    }, [])

    return (
        <div>
            <CalculationsTable />
        </div>
    )
}

export default CalculationsPage;


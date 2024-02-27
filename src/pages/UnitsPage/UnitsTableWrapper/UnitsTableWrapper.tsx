import {useUnits} from "../../../hooks/units/useUnits";
import {useQuery} from "react-query";
import UnitsTable from "./UnitsTable/UnitsTable";

const UnitsTableWrapper = () => {

    const {searchUnits} = useUnits()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["units"],
        () => searchUnits(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <UnitsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default UnitsTableWrapper
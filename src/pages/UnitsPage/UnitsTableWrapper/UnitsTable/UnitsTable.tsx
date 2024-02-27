import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import UnitsFilters from "../../UnitsFilters/UnitsFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import {useUnits} from "../../../../hooks/units/useUnits";

const UnitsTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteUnit} = useUnits()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                <Link to={`/units/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.secondary}>Редактировать</CustomButton>
                </Link>
            )
        },{
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                <CustomButton bg={variables.red} onClick={(e) => handleDeleteUnit(cell.row.values.id)}>
                    Удалить
                </CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (unit_id) => {
        navigate(`/units/${unit_id}/`)
    }

    const handleDeleteUnit = async (unit_id) => {
        await deleteUnit(unit_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <UnitsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default UnitsTable
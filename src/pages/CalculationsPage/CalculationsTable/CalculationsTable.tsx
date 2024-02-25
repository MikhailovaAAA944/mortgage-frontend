import React from "react";
import "./CalculationsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useCalculations} from "../../../hooks/calculations/useCalculations";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import CalculationsFilters from "../CalculationsFilters/CalculationsFilters";

const CalculationsTable = () => {

    const navigate = useNavigate()

    const {searchCalculations} = useCalculations()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершения",
            accessor: "date_complete",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }

                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["calculations"],
        () => searchCalculations(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (calculation_id) => {
        navigate(`/calculations/${calculation_id}`)
    }

    return (
        <div className="calculations-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <CalculationsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default CalculationsTable
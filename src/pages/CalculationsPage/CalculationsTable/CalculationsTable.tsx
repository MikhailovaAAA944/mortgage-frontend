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
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";
import {formate_repayment_date} from "../../../utils/utils";

const CalculationsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

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
        },
        {
            Header: "Дата погашения ипотеки",
            accessor: "repayment_date",
            Cell: ({ value }) => formate_repayment_date(value)
        }
    ]

    if (is_moderator) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptCalculation(cell.row.values.id)}>Принять</CustomButton>
                )
            },
            {
                Header: "Действие",
                    accessor: "dismiss_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissCalculation(cell.row.values.id)}>Отклонить</CustomButton>
                )
            }
        )

    }

    const acceptCalculation = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`calculations/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissCalculation = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`calculations/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
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
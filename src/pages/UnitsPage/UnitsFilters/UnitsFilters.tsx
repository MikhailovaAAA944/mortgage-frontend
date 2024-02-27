import "./UnitsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useUnits} from "../../../hooks/units/useUnits";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const UnitsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useUnits()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="units-filters">

            <h2>Поиск видов расчётов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/units/add" bg={variables.primary}>
                        Добавить вид расчёта
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default UnitsFilters
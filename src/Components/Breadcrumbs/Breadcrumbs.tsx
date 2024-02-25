import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {Unit} from "../../Types";
import {Dispatch} from "react";

const Breadcrumbs = ({ selectedUnit, setSelectedUnit }: { selectedUnit: Unit| undefined, setSelectedUnit: Dispatch<Unit | undefined> }) => {

    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedUnit(undefined)}>
                        Виды рассчёта
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('units/(d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedUnit?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                    <div className={"crumb"}>

                        <Link to={currentLink} onClick={() => setSelectedUnit(undefined)}>
                            Виды рассчёта
                        </Link>

                        <FaChevronRight className={"chevron-icon"}/>

                    </div>

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;
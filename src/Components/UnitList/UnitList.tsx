import "./UnitList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import UnitCard from "./UnitCard/UnitCard";
import {iUnitsMock, requestTime} from "../../Consts";
import {Unit} from "../../Types";

const UnitList = () => {

    const [units, setUnits] = useState<Unit[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchUnits = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/units/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const units = raw["units"]

            setUnits(units)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setUnits(iUnitsMock.filter(unit => unit.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchUnits()
    }, [])

    const cards = units.map(unit  => (
        <UnitCard unit={unit} key={unit.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchUnits()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск видов рассчёта</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default UnitList;
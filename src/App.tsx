import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UnitList from "./Components/UnitList/UnitList";
import UnitPage from "./Components/UnitPage/UnitPage";
import {Unit} from "./Types";

function App() {

    const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/mortgage-frontend">

                        <Breadcrumbs selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>

                        <Routes>

                            <Route path="/" element={<UnitList />} />

                            <Route path="/units/:id" element={<UnitPage selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App

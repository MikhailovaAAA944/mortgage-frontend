import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import UnitPage from "./pages/UnitPage/UnitPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import CalculationConstructor from "./components/CalculationConstructor/CalculationConstructor";
import CalculationPage from "./pages/CalculationPage/CalculationPage";
import CalculationsPage from "./pages/CalculationsPage/CalculationsPage";
import UnitsList from "./pages/UnitsPage/UnitsList/UnitsList";


const TopPanelWrapper = () => {

    const {is_authenticated} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && location.pathname.endsWith("units") && <CalculationConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/mortgage">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/units" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/units" element={<UnitsList />} />

                                    <Route path="/units/:id" element={<UnitPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/calculations/:id" element={<CalculationPage />} />

                                    <Route path="/calculations" element={<CalculationsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App

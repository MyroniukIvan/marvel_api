import AppHeader from "../appHeader/AppHeader";

import CharPage from "../pages/CharPage";
import ComicsPage from "../pages/ComicsPage";

import {
    Route, Routes, BrowserRouter
} from "react-router-dom";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path={'/'}>
                            <Route index element={<CharPage/>}/>
                            <Route path={"comics"}>
                                <Route index element={<ComicsPage/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}


export default App;
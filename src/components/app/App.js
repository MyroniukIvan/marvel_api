import AppHeader from "../appHeader/AppHeader";

import {ComicsPage,Page404, SingleComicPage,CharPage} from "../pages";

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
                        <Route path={"*"} element={<Page404/>}/>
                        <Route path={'/'}>
                            <Route index element={<CharPage/>}/>
                            <Route path={"comics"}>
                                <Route index element={<ComicsPage/>}/>
                            </Route>
                            <Route path={'/comics/:comicId'}>
                                <Route index element={<SingleComicPage/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}


export default App;
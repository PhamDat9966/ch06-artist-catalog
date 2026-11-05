import { BrowserRouter, Routes, Route, Link ,useRoutes } from "react-router-dom";

import Header from "./components/Header"
import Breadcrumb from "./components/Breadcrumb"

// import Home from "./components/Home"
// import Artist from "./components/Artist"
// import Album from "./components/Album"

import routes from "./components/route-config"

function App() {

    return (
        <>
            <div className="container">
                {/* TITLE : START */}
                <Header />
                {/* TITLE : END */}
                <div className="row">
                    <Breadcrumb />
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                    {/*
                    <div className="panel panel-info">
                        <Search />

                        <div className="panel-body">

                            <BrowserRouter>
                                <AppRoutes />
                            </BrowserRouter>
                        </div>
                    </div>
                    */}
                </div>
            </div>

        </>
    )
}

/* Hàm nhận diện route dựng sẵn của ReachJS mà không cần đệ quy */
function AppRoutes() {
    return useRoutes(routes);
}   

export default App

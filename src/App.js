import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./Navbar";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div id="page-body">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route
                            path="/articles"
                            element={<ArticlesListPage />}
                        />
                        <Route
                            path="/articles/:article"
                            element={<ArticlePage />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/create-account"
                            element={<CreateAccountPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

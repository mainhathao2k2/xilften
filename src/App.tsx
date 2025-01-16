import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import './App.css';
import { HomeLayoutProps } from './types/interface';

type RouteConfig = {
    path: string;
    component: React.FC;
    layout?: React.FC<HomeLayoutProps> | null;
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route: RouteConfig, index: number) => {
                        const Layout: React.ComponentType<HomeLayoutProps> | typeof Fragment =
                            route.layout === null ? Fragment : route.layout!;
                        const Page: React.ComponentType = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    ;
                </Routes>
            </div>
        </Router>
    );
};

export default App;

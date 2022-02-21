import MainPage from "../components/MainPage/MainPage";
import ResultsPage from "../components/ResultsPage/ResultsPage";

interface route {
    path: string,
    element: JSX.Element
}

export const publicRoutes: route[] = [
    {path: '/', element: <MainPage/>},
    {path: '/search', element: <ResultsPage/>},
]


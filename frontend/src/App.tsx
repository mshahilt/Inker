import {RouterProvider} from 'react-router-dom'
import {router} from './router/AppRoutes'
import {ThemeProvider} from "@/components/user/common/theme-provider";
import './App.css'

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App

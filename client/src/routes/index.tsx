import { createBrowserRouter } from "react-router-dom";
import Report from "../screens/Report";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Report/>,
    },
  ]);
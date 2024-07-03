import Report from "../screens/Report";
import FruitPurchase from "../screens/FruitPurchase";

export const routes = [
    {
        path: "/",
        element: <Report />,
    },
    {
        path: "/purchases",
        element: <FruitPurchase />,
    }
];
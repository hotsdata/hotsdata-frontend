import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import { router } from "./router.jsx";
import { store } from "./store.js";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

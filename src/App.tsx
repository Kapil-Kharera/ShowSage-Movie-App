import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>Default View</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />}>
          <Route index element={<h1>Latest</h1>} />
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return <AppRouter />;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import MenuPage from "./pages/Menu";
import LocationsPage from "./pages/Locations";
import GuidePage from "./pages/Guide";
import ItemDetailPage from "./pages/ItemDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/menu/:id" element={<ItemDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

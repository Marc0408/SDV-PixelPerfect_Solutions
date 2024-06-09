import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelpPageLayout, Home, ScreenshotDetailPage, NoPage, Main } from "./pages/index.js"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="help" element={<HelpPageLayout />} />
            <Route path="screenshot/:time" element={<ScreenshotDetailPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
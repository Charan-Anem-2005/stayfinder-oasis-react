
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import AllListings from "./pages/AllListings";
import ViewListing from "./pages/ViewListing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyReviews from "./pages/MyReviews";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/listing/:id" element={<ViewListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;

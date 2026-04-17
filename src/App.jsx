import { Outlet, Route, Routes, useParams, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./pages/HeroSection";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ExplorePage from "./pages/ExplorePage";
import LearnPage from "./pages/LearnPage";
import Footer from "./components/layout/Footer";

function PlaceholderPage({ title, description }) {
  return (
    <section className="min-h-[60vh] mx-auto max-w-7xl px-6 pt-44 pb-20">
      <h1 className="text-5xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-4 text-xl text-gray-600">{description}</p>
    </section>
  )
}

function DynamicMenuPage() {
  const { section, slug } = useParams()

  const formatPart = (value) =>
    (value || "")
      .split("-")
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(" ")

  const sectionTitle = formatPart(section)
  const pageTitle = formatPart(slug)

  return (
    <PlaceholderPage
      title={`${pageTitle || "Page"}`}
      description={`This is the ${pageTitle || "selected"} page under ${sectionTitle || "this"} section.`}
    />
  )
}

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function BareLayout() {
  return <Outlet />
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HeroSection />} />
        <Route path="/:section/:slug" element={<DynamicMenuPage />} />
      </Route>

      <Route element={<BareLayout />}>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/learn" element={<LearnPage />} />
      </Route>

 
    </Routes>
  );
}

export default App;

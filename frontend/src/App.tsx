import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import { useAppData } from "./context/AppContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import BuildResumePage from "./pages/BuildResume";
import InterviewPrep from "./pages/Interview";
import JobMatcherPage from "./pages/JobMatcher";
import AnalysePage from "./pages/Analyse";
import JDMatcherPage from "./pages/JDMatcher";
import NotFound from "./pages/NotFound";

const App = () => {
  const { loading } = useAppData();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/account" element={<Account />} />
            <Route path="/analyse" element={<AnalysePage />} />
            <Route path="/jobmatcher" element={<JobMatcherPage />} />
            <Route path="/interviewprep" element={<InterviewPrep />} />
            <Route path="/resumebuilder" element={<BuildResumePage />} />
            <Route path="/jdmatcher" element={<JDMatcherPage />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

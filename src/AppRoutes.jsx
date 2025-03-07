import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ThemeProvider } from "./providers/ThemeProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Loading from "./components/Loading.jsx"; // ✅ Caminho corrigido
import Profile from "./pages/Profile/Profile.jsx"; // ✅ Caminho corrigido
import { Toaster } from "@/shadcn/components/ui/toaster";
import { UserDocProvider } from "./contexts/UserDocContext";
import useMediaQuery from "./hooks/useMediaQuery";
import Topbar from "./components/Topbar";
import PasswordRecovery from "./pages/Recover/Recover";
import Help from "./pages/Help/Help";
import Training from "./pages/Adestramento/TrainingTracks";
import { ReferrerDocProvider } from "./contexts/ReferrerDocContext";
import { db, auth } from "./firebase/firebaseConfig"; // ✅ Caminho corrigido
import { doc, onSnapshot } from "firebase/firestore";
import Dashboard from "./pages/Adestramento/Dashboard.jsx"; // ✅ Caminho correto
import TopbarMobile from "./components/TopbarMobile";
import BottomBar from "./components/BottomBar";
import Content from "./pages/Content/Content";

// ✅ Importando novas páginas de Adestramento
import TrainingTracks from "@/pages/Adestramento/TrainingTracks";
import Lessons from "@/pages/Adestramento/Lessons";
import LessonPage from "@/components/Training/LessonPage.jsx"; // ✅ Corrigido para .jsx
import Progress from "@/pages/Adestramento/Progress";

// ✅ Importando Ranking de Usuários
import Ranking from "./pages/adestramento/Ranking.jsx"; // ✅ Caminho corrigido para Ranking.jsx

function AppRoutes() {
  const { user, authIsReady } = useAuthContext();
  const [rerender, setRerender] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isWatching, setIsWatching] = useState(false);
  const [redirectToRoute, setRedirectToRoute] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const scrollToTop = useRef(null);

  if (!authIsReady) {
    console.log("Not auth is ready");
    return <Loading />;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div ref={scrollToTop} className="App flex flex-col sm:flex-row bg-background">
        <Toaster />
        <BrowserRouter>
          {user ? (
            <UserDocProvider user={user}>
              <ReferrerDocProvider user={user}>
                {isMobile ? <TopbarMobile setRerender={setRerender} /> : <Topbar setRerender={setRerender} />}
                {isMobile ? null : (
                  <div
                    className={`${
                      sidebarExpanded ? "w-[284px]" : "w-[90px]"
                    } w-[286px] h-[calc(100vh_-_120px)] fixed top-24 left-5 bottom-5 overflow-y-hidden border rounded-md`}
                  >
                    <Sidebar
                      rerender={rerender}
                      setRerender={setRerender}
                      sidebarExpanded={sidebarExpanded}
                      setSidebarExpanded={setSidebarExpanded}
                      isWatching={isWatching}
                      setIsWatching={setIsWatching}
                    />
                  </div>
                )}
                <div className="sm:w-[calc(100%_-_300px)] sm:ml-[310px] mt-[80px] px-2.5 sm:px-5 sm:mt-[112px]">
                  <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Nova rota do Dashboard */}
                    <Route path="/ranking" element={<Ranking />} /> {/* ✅ Nova rota do Ranking */}
                    <Route path="/content" element={<Content />} />
                    <Route path="/conta" element={<Profile />} /> {/* ✅ Rota do perfil corrigida */}
                    <Route path="/help" element={<Help />} />

                    {/* ✅ Novas Rotas de Adestramento */}
                    <Route path="/training" element={<TrainingTracks />} />
                    <Route path="/training/:trackId" element={<Lessons />} />
                    <Route path="/lesson/:lessonId" element={<LessonPage />} /> {/* ✅ Corrigida a importação */}
                    <Route path="/progress" element={<Progress />} />

                    <Route path="*" element={<Dashboard />} />
                  </Routes>
                </div>
                {isMobile ? <BottomBar /> : null}
              </ReferrerDocProvider>
            </UserDocProvider>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/password/recovery" element={<PasswordRecovery />} />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default AppRoutes;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import { ColorSchemeProvider } from "@/context/ColorSchemeContext";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import WorkoutPage from "./pages/Workout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="fitness-theme">
        <ColorSchemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<RequireAuth />}>
                  <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/diet" element={<Diet />} />
                    <Route path="/workouts/:category" element={<WorkoutPage />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ColorSchemeProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Language from './pages/Language';
import Accent from './pages/Accent';
import Voice from './pages/Voice';
import Notifications from './pages/Notifications';
import Accessibility from './pages/Accessibility';
import AvatarSelect from './pages/AvatarSelect';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={isAuthenticated ? <Categories /> : <Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/language" element={<Language />} />
          <Route path="/accent" element={<Accent />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/avatar" element={<AvatarSelect />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
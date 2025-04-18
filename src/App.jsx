import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import FavoritoList from './pages/client/FavoritoList';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Verify from './pages/Verify';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import { AuthProvider } from './context/AuthContext'; // 👈 Importa el provider
import ProductosPage from './pages/admin/ProductosPage';
import CategoriasPage from './pages/admin/CategoriasPage';
import MarcasPage from './pages/admin/MarcasPage';
import EspeciesPage from './pages/admin/EspeciesPage';
import EtiquetasPage from './pages/admin/EtiquetasPage';
import TallasPage from './pages/admin/TallasPage';
import PesosPage from './pages/admin/PesosPage';
import ColoresPage from './pages/admin/ColoresPage';
import ServiciosPage from './pages/admin/ServiciosPage';
import UsuariosPage from './pages/admin/UsuariosPage';
import VariantesPage from './pages/admin/VariantesPage';

function App() {
  return (
    <AuthProvider> {/* 👈 Envuelve todo en el AuthProvider */}
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/verificar" element={<Verify />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/producto/:productId" element={<ProductDetail />} />

            {/* Protegidas solo para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route path="/favoritos" element={<FavoritoList />} />
            </Route>

            {/* Protegidas solo para admin */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/productos" element={<ProductosPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/categorias" element={<CategoriasPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/marcas" element={<MarcasPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/especies" element={<EspeciesPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/etiquetas" element={<EtiquetasPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/tallas" element={<TallasPage/>} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/pesos" element={<PesosPage/>} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/colores" element={<ColoresPage/>} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/servicios" element={<ServiciosPage/>} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/usuarios" element={<UsuariosPage/>} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/variantes" element={<VariantesPage/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


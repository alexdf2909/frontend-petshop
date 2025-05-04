import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Home from './pages//public/Home';
import Dashboard from './pages/admin/Dashboard';
import FavoritoList from './pages/client/FavoritoList';
import ProductList from './pages//public/ProductList';
import ProductDetail from './pages//public/ProductDetail';
import Header from './components/shared/Header';
import Verify from './pages//public/Verify';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import { AuthProvider } from './context/AuthContext';
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
import ComprasPage from './pages/admin/ComprasPage';
import LotesPage from './pages/admin/LotesPage';
import Historial from './pages/client/Historial';
import Pedido from './pages/client/Pedido';
import MisMascotas from './pages/client/MisMascotas';
import ServiciosList from './pages/public/ServiciosList';
import ServicioDetail from './pages/public/ServicioDetail';
import RazasPage from './pages/admin/RazasPage';
import EditarPerfil from "./pages/client/EditarPerfil";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/verificar" element={<Verify />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/producto/:productoId" element={<ProductDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<EditarPerfil />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/mascotas" element={<MisMascotas />} />
            </Route>

            <Route path="/servicios" element={<ServiciosList />} />
            <Route path="/servicio/:servicioId" element={<ServicioDetail />} />

            {/* Rutas protegidas solo para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route path="/favoritos" element={<FavoritoList />} />
              <Route path="/historial" element={<Historial />} />
              <Route path="/pedido" element={<Pedido />} />
            </Route>

            {/* Rutas para el admin */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                {/* Aquí las rutas secundarias del admin */}
                <Route path="productos" element={<ProductosPage />} />
                <Route path="categorias" element={<CategoriasPage />} />
                <Route path="marcas" element={<MarcasPage />} />
                <Route path="especies" element={<EspeciesPage />} />
                <Route path="etiquetas" element={<EtiquetasPage />} />
                <Route path="tallas" element={<TallasPage />} />
                <Route path="pesos" element={<PesosPage />} />
                <Route path="colores" element={<ColoresPage />} />
                <Route path="servicios" element={<ServiciosPage />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="variantes" element={<VariantesPage />} />
                <Route path="compras" element={<ComprasPage />} />
                <Route path="lotes" element={<LotesPage />} />
                <Route path="razas" element={<RazasPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
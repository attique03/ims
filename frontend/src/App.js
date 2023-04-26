import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardPage from './pages/dashboard/DashboardPage';
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/LoginPage';
import Organizations from './pages/organization/Organizations';
import Category from './pages/categories/Category';
import CollapsibleTable from './pages/categories/categoryList/CategoryListPage';
import CategoryCreatePage from './pages/categories/categoryCreate/CategoryCreatePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import OrganizationListPage from './pages/organization/organizationList/OrganizationListPage';
import OrganizationCreatePage from './pages/organization/organizationCreate/OrganizationCreatePage';
import OrganizationPage from './pages/organization/organizationDetail/OrganizationPage';
import AdminListPage from './pages/admin/adminList/AdminListPage';
import Admins from './pages/admin/Admins';
import AdminCreatePage from './pages/admin/adminCreate/AdminCreatePage';
import AdminPage from './pages/admin/adminDetail/AdminPage';
import ComplaintListPage from './pages/compaint/ComplaintListPage';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Router>
        {userInfo && <Navbar />}
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <ProtectedRoute>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route path="organizations" element={<Organizations />}>
              <Route exact path="" element={<OrganizationListPage />} />
              <Route exact path="create" element={<OrganizationCreatePage />} />
              <Route exact path=":id" element={<OrganizationPage />} />
            </Route>

            <Route path="admins" element={<Admins />}>
              <Route exact path="" element={<AdminListPage />} />
              <Route exact path="create" element={<AdminCreatePage />} />
              <Route exact path=":id" element={<AdminPage />} />
            </Route>

            <Route path="categories" element={<Category />}>
              <Route path="" element={<CollapsibleTable />} />
              <Route path="create" element={<CategoryCreatePage />} />
            </Route>

            <Route path="/complaints" element={<ComplaintListPage />} />
          </Routes>
        </ProtectedRoute>
      </Router>
    </StyledEngineProvider>
  );
}

export default App;

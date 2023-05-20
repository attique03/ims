import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withProtectedRoute } from './components/protectedRoute/AuthenticatedRoute';
import { useSelector } from 'react-redux';
import DashboardPage from './pages/dashboard/DashboardPage';
import Navbar from './components/navbar/Navbar';
import LoginPage from './pages/login/LoginPage';
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
import ComplaintListPage from './pages/complaint/complaintList/ComplaintListPage';
import ComplaintPage from './pages/complaint/complaintDetail/ComplaintPage';
import InventoryCreatePage from './pages/inventory/inventoryCreate/InventoryCreatePage';
import InventoryListPage from './pages/inventory/inventoryList/InventoryListPage';
import ComplaintCreatePage from './pages/complaint/complaintCreate/ComplaintCreatePage';
import SubCategoryPage from './pages/subCategory/subCategoryDetail/SubCategoryPage';
import ForgotPasswordPage from './pages/forgot-password/ForgotPasswordPage';
import VerifyCodePage from './pages/verify-code/VerifyCodePage';
import ResetPasswordPage from './pages/reset-password/ResetPasswordPage';
import InventoryPage from './pages/inventory/inventoryDetail/InventoryPage';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const ProtectedDashboard = withProtectedRoute(DashboardPage);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Router>
        {userInfo && <Navbar />}
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          {/* <Route exact path="/" element={<DashboardPage />} /> */}

          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route exact path="/verify-code" element={<VerifyCodePage />} />
          <Route exact path="/reset-password" element={<ResetPasswordPage />} />
          {/* </Routes>

        <ProtectedRoute>
          <Routes> */}
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
            <Route
              path=":id/sub-category/:subCatId"
              element={<SubCategoryPage />}
            />
          </Route>

          <Route path="complaints" element={<Category />}>
            <Route path="" element={<ComplaintListPage />} />
            <Route path="create" element={<ComplaintCreatePage />} />
            <Route path=":id" element={<ComplaintPage />} />
          </Route>

          <Route path="inventory" element={<Category />}>
            <Route path="" element={<InventoryListPage />} />
            <Route path="create" element={<InventoryCreatePage />} />
            <Route path=":id" element={<InventoryPage />} />
          </Route>
        </Routes>
        {/* </ProtectedRoute> */}
      </Router>
    </StyledEngineProvider>
  );
}

export default App;

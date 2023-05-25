import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withProtectedRoute } from './components/protectedRoute/AuthenticatedRoute';
import { useSelector } from 'react-redux';
import DashboardPage from './pages/dashboard/DashboardPage';
import Navbar from './components/navbar/Navbar';
import LoginPage from './pages/login/LoginPage';
import CollapsibleTable from './pages/categories/categoryList/CategoryListPage';
import CategoryCreatePage from './pages/categories/categoryCreate/CategoryCreatePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import OrganizationListPage from './pages/organization/organizationList/OrganizationListPage';
import OrganizationCreatePage from './pages/organization/organizationCreate/OrganizationCreatePage';
import OrganizationPage from './pages/organization/organizationDetail/OrganizationPage';
import AdminListPage from './pages/admin/adminList/AdminListPage';
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
import LoadingWrapper from './components/loadingWrapper/LoadingWrapper';
import NotFound from './pages/notFound/NotFound';
import OutletWrapper from './components/outlet/OutletWrapper';
import RequestsListPage from './pages/requests/requestsList/RequestsListPage';
import ReturnsListPage from './pages/returns/returnsList/ReturnsListPage';
import RequestsPage from './pages/requests/requestsDetail/RequestsPage';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Router>
        {userInfo && <Navbar />}
        {/* <LoadingWrapper> */}
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route exact path="/verify-code" element={<VerifyCodePage />} />
          <Route exact path="/reset-password" element={<ResetPasswordPage />} />
          {/* </Routes> */}

          {/* <ProtectedRoute> */}
          {/* <Routes> */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="organizations"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              exact
              path=""
              element={
                <ProtectedRoute>
                  <OrganizationListPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="create"
              element={
                <ProtectedRoute>
                  <OrganizationCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path=":id"
              element={
                <ProtectedRoute>
                  <OrganizationPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="admins"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              exact
              path=""
              element={
                <ProtectedRoute>
                  <AdminListPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="create"
              element={
                <ProtectedRoute>
                  <AdminCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path=":id"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="categories"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <CollapsibleTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CategoryCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id/sub-category/:subCatId"
              element={
                <ProtectedRoute>
                  <SubCategoryPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="complaints"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <ComplaintListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <ComplaintCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <ComplaintPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="inventory"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <InventoryListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <InventoryCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <InventoryPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="requests"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <RequestsListPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="create"
              element={
                <ProtectedRoute>
                  <InventoryCreatePage />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <RequestsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="returns"
            element={
              <ProtectedRoute>
                <OutletWrapper />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <ReturnsListPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="create"
              element={
                <ProtectedRoute>
                  <InventoryCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <InventoryPage />
                </ProtectedRoute>
              }
            /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </ProtectedRoute> */}
        {/* </LoadingWrapper> */}
      </Router>
    </StyledEngineProvider>
  );
}

export default App;

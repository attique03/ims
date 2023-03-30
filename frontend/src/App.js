import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import OrganizationCreatePage from './pages/organization/OrganizationCreatePage';
import OrganizationListPage from './pages/organization/OrganizationListPage';
import OrganizationPage from './pages/organization/OrganizationPage';
import Category from './pages/categories/Category';
import CollapsibleTable from './pages/categories/CategoryListPage';
import CategoryCreatePage from './pages/categories/CategoryCreatePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<DashboardPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="organizations" element={<Category />}>
          <Route exact path="" element={<OrganizationListPage />} />
          <Route exact path="create" element={<OrganizationCreatePage />} />
          <Route exact path="details" element={<OrganizationPage />} />
        </Route>

        <Route path="categories" element={<Category />}>
          <Route path="" element={<CollapsibleTable />} />
          <Route path="create" element={<CategoryCreatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

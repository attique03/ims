import { useSelector } from 'react-redux';
import DashboardSuperAdmin from '../../components/dashboard/superadmin/DashboardSuperAdmin';
import DashboardAdmin from '../../components/dashboard/admin/DashboardAdmin';
import DashboardEmployee from '../../components/dashboard/employee/DashboardEmployee';
import { ADMIN, EMPLOYEE, SUPERADMIN } from '../../utils/constants';

const DashboardPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <div>
      {userInfo?.user?.role?.role === SUPERADMIN ? (
        <DashboardSuperAdmin />
      ) : userInfo?.user?.role?.role === ADMIN ? (
        <DashboardAdmin />
      ) : userInfo?.user?.role?.role === EMPLOYEE ? (
        <DashboardEmployee />
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default DashboardPage;

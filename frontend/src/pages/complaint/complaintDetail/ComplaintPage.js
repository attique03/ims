import { useSelector } from 'react-redux';
import ComplaintDetailAdmin from '../../../components/complaint/admin/complaintDetailAdmin/ComplaintDetailAdmin';
import ComplaintDetailEmployee from '../../../components/complaint/employee/complaintDetailEmployee/ComplaintDetailEmployee';
import ComplaintDetailSuperAdmin from '../../../components/complaint/superadmin/complaintDetailSuperAdmin/ComplaintDetailSuperAdmin';
import { ADMIN, EMPLOYEE, SUPERADMIN } from '../../../utils/constants';

const ComplaintPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <div>
      {userInfo?.user.role.role === SUPERADMIN ? (
        <ComplaintDetailSuperAdmin />
      ) : userInfo?.user.role.role === ADMIN ? (
        <ComplaintDetailAdmin />
      ) : userInfo?.user.role.role === EMPLOYEE ? (
        <ComplaintDetailEmployee />
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default ComplaintPage;

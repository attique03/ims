import { useSelector } from 'react-redux';
import ComplaintDetailAdmin from '../../../components/complaint/admin/complaintDetailAdmin/ComplaintDetailAdmin';
import ComplaintDetailEmployee from '../../../components/complaint/employee/complaintDetailEmployee/ComplaintDetailEmployee';
import ComplaintDetailSuperAdmin from '../../../components/complaint/superadmin/complaintDetailSuperAdmin/ComplaintDetailSuperAdmin';

const ComplaintPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <div>
      {userInfo?.user.role.role === 'superadmin' ? (
        <ComplaintDetailSuperAdmin />
      ) : userInfo?.user.role.role === 'admin' ? (
        <ComplaintDetailAdmin />
      ) : userInfo?.user.role.role === 'employee' ? (
        <ComplaintDetailEmployee />
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default ComplaintPage;

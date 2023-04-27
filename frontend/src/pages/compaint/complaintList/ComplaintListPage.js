import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComplaintListAdmin from '../../../components/complaint/admin/complaintListAdmin/ComplaintListAdmin';
import ComplaintListEmployee from '../../../components/complaint/employee/complaintListEmployee/ComplaintListEmployee';
import ComplaintListSuperAdmin from '../../../components/complaint/superadmin/complaintListSuperAdmin/ComplaintListSuperAdmin';

const ComplaintListPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  
  return (
    <div>
      {userInfo?.user.role.role === 'superadmin' ? (
        <ComplaintListSuperAdmin />
      ) : userInfo?.user.role.role === 'admin' ? (
        <ComplaintListAdmin />
      ) : userInfo?.user.role.role === 'employee' ? (
        <ComplaintListEmployee />
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default ComplaintListPage;

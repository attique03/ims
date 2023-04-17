import { useParams } from 'react-router-dom';
import React from 'react';

const AdminPage = () => {
  const params = useParams();
  return <div>AdminPage {params.id}</div>;
};

export default AdminPage;

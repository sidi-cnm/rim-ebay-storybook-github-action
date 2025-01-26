// components/AdminLayout.js
import React from 'react';
import Link from 'next/link';
import SideNavigation from '../components/SideNavigation';

const AdminLayout = ({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
      params:{
        locale:string
      }
  }>) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      {/* Content */}
      <div className="flex ">
      <SideNavigation />
      {children}
      </div>
    </div>
  );
};

export default AdminLayout;

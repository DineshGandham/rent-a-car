import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { useLayout } from '../hooks/layout/useLayout';

const PageLayout = ({ children }) => {
  const { paddingTop } = useLayout();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop }}>
        {children}
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            padding: '12px 16px',
            fontSize: '14px',
            borderRadius: '12px',
          },
        }}
      />
    </>
  );
};

export default PageLayout;

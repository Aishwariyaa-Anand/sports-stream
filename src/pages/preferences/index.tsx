// src/pages/preferences/index.tsx
import React, { useState } from 'react';
import PreferenceModal from './PreferenceModal';
import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const Preferences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <PreferenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Preferences;

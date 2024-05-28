// src/pages/changepass/index.tsx
import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';

const ChangePass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChangePass;

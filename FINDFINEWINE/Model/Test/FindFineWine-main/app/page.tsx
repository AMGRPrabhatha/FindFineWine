"use client"
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Modal from './components/Modal';
import Recommendsec from './components/recommendsec';

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    
    if (isUserVerified) {
      setIsVerified(true);
      setShowModal(false);
    }
  }, []);

  const handleConfirm = () => {
    setIsVerified(true);
    setShowModal(false);
    setIsUserVerified(true);
  };

  const handleClose = () => {
    alert('Palayan podi kariyoo yanna!!');
    // Optionally, redirect to another site or close the tab
    window.location.href = 'https://www.google.com';
  };

  return (
    <div>
      {isVerified ? (
        <Hero />
      ) : (
        <Modal show={showModal} onClose={handleClose} onConfirm={handleConfirm} />
      )}
      <Recommendsec />
    </div>
  );
}

import React, { useEffect, useContext } from 'react';
import { PetContext } from '../Context/Context';

export default function SuccessPayment() {
  const { fetchPaymentStatus } = useContext(PetContext);

  useEffect(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

  return (
    <div className="payment-success">
      <img src="https://assets.materialup.com/uploads/9ba2d687-d7d3-4361-8aee-7b2a3c074761/preview.gif" alt="Success" />
    </div>
  );
}

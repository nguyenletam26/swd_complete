import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { paymentService } from '@/services/payment';

const PaymentVerify = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      // Get all URL parameters
      const searchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(searchParams.entries());

      try {
        if (!isVerified) {
          await paymentService.verify(params);
          // Check if the payment was successful using vnp_ResponseCode
          if (params.vnp_ResponseCode === '00') {
            toast.success("Nạp tiền thành công!");
            navigate('/payment', { replace: true });
            return null;
          } else {
            toast.error("Xác minh thanh toán thất bại!");
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error("Đã xảy ra lỗi trong quá trình xác minh thanh toán!");
      }
    };

    verifyPayment();
  }, [isVerified, navigate, toast]);

  return null;
};

export default PaymentVerify;
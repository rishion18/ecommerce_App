import { useRef , useEffect } from 'react';
import{useSelector} from 'react-redux'
// Function to load script and append in DOM tree.


const loadScript = src => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('error in loading razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});


const RenderRazorpay = ({
  orderId,
  currency,
  amount,
}) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const { currentUser } = useSelector((state) => state.products);


  const options = {
    key:'rzp_test_ynRcdWmb5fyIlt',
    amount, // Amount in lowest denomination from props
    currency, // Currency from props.
    name: `${currentUser.userName}`, 
    order_id: orderId, // order id from props
    prefill: {
      "name": `${currentUser.userName}`,
      "email": `${currentUser.email}`
  },
    callback_url: "http://localhost:3012/api/razorPay/paymentVerification",
    redirect: true
    
  };

  // To load razorpay checkout modal script.
  const displayRazorpay = async (options) => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );

    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    // to open razorpay checkout modal.
    rzp1.open();
  };
  
  useEffect(() => {
    console.log('in razorpay');
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;
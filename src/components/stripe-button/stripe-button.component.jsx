import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price})=>{
  const priceForStripe=price*100;
  const publishableKey='pk_test_51Jf6HHJZsxhY2rrjUOgkbrHKsFXUya2VAEhE8gb30qYgl3ENKp75DNTEZbJIUSkuk79aZq0Di0V67TXK2E0vLwdX00b6e3GZUy';

  const onToken=token=>{
    console.log(token);
    alert('Payment successful');
  }
  
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothin Inc.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`You total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;
to Login - username - rishi@gmail.com  password - qwerty
I am using stripe in test mode - to make a successfull payment use this card - 4000 0035 6000 0008  cvv - 123 and fill any address
manually click on complete to make a dummy payment
deployed app link - https://ecommerce-app-psi-roan.vercel.app/

Tech stack used                       - Reactjs , express , Nodejs , MongoDB (MERN) 
state management                      - Redux toolkit
for authentication and authorization  - jsonwebtoken , bcryptjs
for styling                           - tailwind css
for payment integration               - stripe checkout

Features in app - 

1. user features

-> user can login as seller or customer
-> seller can add products and they will be displayed to customers
-> customers can view all the products category wise or subcategory wise


2. cart features

-> to add a product to cart customer has to login first 
-> once logged in customer can see a cart icon from where he/she can access cart add , delete or increase count of products


3. payment integration

-> once customer clicks on continue to payment , customer is taken to stripe page and an order is created in database with payment status pending
-> once the payment completes , status of payment is updated on database with the help of WEBHOOK API ,and customer is directed to success page 


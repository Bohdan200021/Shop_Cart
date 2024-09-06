import React, { useEffect, useState } from 'react';
import './Cart.scss';

const Cart = ({ cart, setCart, handleProductQuantity }) => {
  const [price, setPrice] = useState(0);

  // Обчислюємо загальну ціну
  const handlePrice = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.amount * item.price; // Має бути множення
    });
    setPrice(totalAmount);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]); // Оновлюємо ціну при зміні корзини

  const removeProduct = (id) => {
    const newList = cart.filter((item) => item.id !== id);
    setCart(newList);
  };

  return (
    <div className="cart">
      {cart.map((item) => (
        <div className="cart-box" key={item.id}>
          <div className="cart-img">
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleProductQuantity(item, +1)}>+</button>
            <button>{item.amount}</button>
            <button onClick={() => handleProductQuantity(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => removeProduct(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      {/* Відображення загальної ціни */}
      <div className="total">
        <span>Total Price: ${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;

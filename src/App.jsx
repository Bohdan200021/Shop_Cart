import { useState } from 'react';
import './App.scss';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Products from './components/Products/Products';

function App() {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  // Додаємо товар до корзини
  const addToCart = (item) => {
    const isProductPresent = cart.some((product) => product.id === item.id);

    if (isProductPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
      return;
    }

    setCart([...cart, { ...item, amount: 1 }]);
  };

  // Зміна кількості товару
  const handleProductQuantity = (item, d) => {
    setCart((prevCart) =>
      prevCart.map((data) =>
        data.id === item.id
          ? { ...data, amount: Math.max(1, data.amount + d) }
          : data
      )
    );
  };

  return (
    <div className="App">
      <Header size={cart.length} setShow={setShow} />
      {show ? (
        <Products addToCart={addToCart} />
      ) : (
        <Cart
          cart={cart}
          setCart={setCart}
          handleProductQuantity={handleProductQuantity}
        />
      )}

      {warning && (
        <div className="warning">Product is already added to your Cart !</div>
      )}
    </div>
  );
}

export default App;

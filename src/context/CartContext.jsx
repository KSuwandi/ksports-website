import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  /* =========================
     LOAD CART FROM STORAGE
  ========================= */
  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem("ksports-cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  /* =========================
     SAVE CART TO STORAGE
  ========================= */
  useEffect(() => {

    localStorage.setItem(
      "ksports-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = (product) => {

    setCart((prev) => {

      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      /* ITEM EXISTS */
      if (existingItem) {

        return prev.map((item) =>

          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item

        );

      }

      /* NEW ITEM */
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  };

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeFromCart = (id) => {

    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );

  };

  /* =========================
     INCREASE QTY
  ========================= */
  const increaseQty = (id) => {

    setCart((prev) =>

      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item

      )

    );

  };

  /* =========================
     DECREASE QTY
  ========================= */
  const decreaseQty = (id) => {

    setCart((prev) =>

      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item

      )

    );

  };

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = () => {

    setCart([]);

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>

  );

}

/* =========================
   USE CART
========================= */
export function useCart() {

  return useContext(CartContext);

}
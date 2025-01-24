import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import { getProduct } from "../../services/productServices";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, loading, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cart?.items) return;

      try {
        setIsFetching(true);
        const fetchedProducts = await Promise.all(
          cart.items.map(async (item) => {
            // اگر اطلاعات محصول کامل نیست، درخواست بده
            if (!item.productId.name || !item.productId.imageUrl) {
              const productData = await getProduct(item.productId); // درخواست API
              return { ...item, productId: productData };
            }
            return item;
          })
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProductDetails();
  }, [cart]);

  if (loading || isFetching) return <p>Loading...</p>;

  if (!products || products.length === 0) return <p>Your cart is empty!</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {products.map((item) => (
        <div key={item.productId._id}>
          <Link
            to={`/products/` + item.productId._id}
            className="text-blue-700 text-xl m-6"
          >
            {item.productId.name}
          </Link>
          <img
            src={item.productId.imageUrl}
            alt={item.productId.name}
            className="size-11"
          />
          <p>Quantity: {item.quantity}</p>
          <Button onClick={() => removeFromCart(item.productId._id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;

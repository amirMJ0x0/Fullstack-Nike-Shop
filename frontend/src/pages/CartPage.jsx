import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import { getProduct } from "../../services/productServices";
import { Button, Heading, HStack, Image, Stack } from "@chakra-ui/react";
import CartItem from "../components/CartItem";
import Loading from "../components/share/Loading";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const { cart, loading } = useCart();
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cart?.items) return;

      try {
        setIsFetching(true);
        const fetchedProducts = await Promise.all(
          cart.items.map(async (item) => {
            if (!item.productId.name || !item.productId.imageUrl) {
              const productData = await getProduct(item.productId);
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

  if (loading || isFetching) return <Loading />;

  if (!products || products.length === 0)
    return (
      <div className="flex justify-center my-32">
        <Image
          className="size-72 md:size-1/3"
          src={"transparent-emptyCart.png"}
          loading="lazy"
          opacity={50}
          draggable={false}
        />
      </div>
    );

  const subtotal = products.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const totalDiscount = products.reduce(
    (acc, item) =>
      acc +
      ((item.productId.price * item.productId.discount) / 100) * item.quantity,
    0
  );
  const taxAmount = 2;
  const tax = subtotal * (taxAmount / 100);
  const total = subtotal - totalDiscount + tax;

  return (
    <section className="padding-x mt-10 mb-32">
      <Helmet>
        <title>Nike - Cart</title>
      </Helmet>
      <Heading my={5}>Your Cart</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16">
        <div className="col-span-2">
          {products.map((item) => (
            <CartItem itemInfo={item} key={item.productId._id} />
          ))}
        </div>
        <Stack
          p={5}
          spacing={4}
          borderWidth={1}
          borderRadius="lg"
          className="md:col-span-1 max-h-min max-sm:mt-24"
        >
          <HStack justifyContent="space-between">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </HStack>
          <HStack justifyContent="space-between">
            <p>Discount:</p>
            <p className="text-red-500">-${totalDiscount.toFixed(2)}</p>
          </HStack>
          <HStack justifyContent="space-between">
            <p>Tax (${taxAmount}%):</p>
            <p>${tax.toFixed(2)}</p>
          </HStack>
          <HStack justifyContent="space-between" fontWeight="bold">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </HStack>
          <Button colorScheme="orange" className="w-full">
            Checkout
          </Button>
        </Stack>
      </div>
    </section>
  );
};

export default CartPage;

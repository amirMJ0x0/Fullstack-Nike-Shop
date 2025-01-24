import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/productServices";
import { useRef } from "react";
import { useCart } from "../context/CartProvider";

const ProductPage = () => {
  const { productId } = useParams();
  const productImageRef = useRef();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  const changeMainImage = (imageUrl) => {
    productImageRef.current.src = imageUrl;
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div className="p-8">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <div className="border ">
            <img
              src={product.imageUrl[0]}
              alt={product.name}
              className="rounded-lg"
              ref={productImageRef}
            />
          </div>

          <div className="flex-row mt-4 gap-2">
            {product.imageUrl.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => changeMainImage(img)}
                alt={`Thumbnail ${idx}`}
                className="w-20 h-20 object-cover rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-orange-600">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>

          {/* Size Selection */}
          <div>
            <p className="font-medium">Size:</p>
            <div className="flex gap-2 mt-2">
              {product.size.map((s, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 border rounded hover:bg-orange-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {product.comments.map((comment, idx) => (
          <div key={idx} className="mt-4 p-4 border rounded-lg">
            <p className="font-medium">{comment.userId}</p>
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">Rating: {comment.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

import { useEffect, useState } from "react";
import {
  getSavedProducts,
  toggleSaveProduct,
} from "../../services/userServices";
import { Button, useToast } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SaveProduct = ({ productId = "" }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const { favorites } = await getSavedProducts();
        setIsSaved(favorites.some((product) => product._id === productId));
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };
    fetchSavedProducts();
  }, [productId]);

  const handleSaveClick = async () => {
    if (user) {
      try {
        await toggleSaveProduct(productId);
        setIsSaved((prev) => !prev);
      } catch (error) {
        console.error("Error toggling save:", error);
      }
    } else {
      toast({
        title: "Acess Denied.",
        description: "You must login in your account for saving product!",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top-left",
        variant: "subtle",
      });
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleSaveClick} size={"lg"}>
      {isSaved ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-red-500 text-xl" />
      )}
    </Button>
  );
};

export default SaveProduct;

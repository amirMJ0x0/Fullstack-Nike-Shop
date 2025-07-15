
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/productServices";
import { scrollTo } from "../utils/scrollToTop";
import { useRef } from "react";

export const useProductQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const newParams = new URLSearchParams(searchParams);
    const queryString = searchParams.toString();
    const page = parseInt(searchParams.get("page")) || 1;
    const resultRef = useRef(null);


    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["products", queryString],
        queryFn: () => getAllProducts(queryString),
    });

    const onPreviousPage = () => {
        newParams.set("page", page - 1);
        setSearchParams(newParams, { replace: true });
    };

    const onNextPage = () => {
        newParams.set("page", page + 1);
        setSearchParams(newParams, { replace: true });
    };

    const goSpecificPage = (pageIndex) => {
        newParams.set("page", pageIndex);
        setSearchParams(newParams, { replace: true });
    };

    const scrollToRef = () => {
        if (resultRef.current) scrollTo(resultRef.current.offsetTop);
    };
    return {
        page,
        data,
        isLoading,
        isFetching,
        queryString,
        onPreviousPage,
        onNextPage,
        goSpecificPage,
        resultRef,
        scrollToRef
    };
};

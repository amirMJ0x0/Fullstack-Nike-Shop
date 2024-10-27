import { useMemo } from "react"

const useSortedProducts = (products = [], sortType = "") => {
    const sortedProducts = useMemo(() => {
        switch (sortType) {
            case "popularity":
                return [...products]
                    .sort((a, b) => b.sellCount - a.sellCount)
            case "lowPrice":
                return [...products]
                    .sort((a, b) => a.price - b.price)
            case "highPrice":
                return [...products]
                    .sort((a, b) => b.price - a.price)
            case "views":
                return [...products]
                    .sort((a, b) => b.viewCount - a.viewCount)
            case "newest":
                return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
            default:
                return products
        }
    }, [products, sortType])

    return sortedProducts
}

export default useSortedProducts;
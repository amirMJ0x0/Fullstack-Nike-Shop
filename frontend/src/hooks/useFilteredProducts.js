import { useMemo } from "react"

const useFilteredProducts = (products, filters) => {
    const filteredProducts = useMemo(() => {
        if (!products) return []

        return products.filter((product) => {
            if (filters.gender && filters.gender.size > 0 && !filters.gender.has(product.gender))
                return false;
            if (filters.size && filters.size.size > 0 && !product.size.some((size) => filters.size.has(size)))
                return false;
            if (filters.color && filters.color.size > 0 && !product.color.some((color) => filters.color.has(color)))
                return false;

            if (filters.price && filters.price.size > 0) {
                const price = product.price;

                if (filters.price.has("0$ - 25$") && price > 25) return false
                if (filters.price.has("25$ - 50$") && (price < 25 || price > 50)) return false
                if (filters.price.has("50$ - 100$") && (price < 50 || price > 100)) return false
                if (filters.price.has("100$ - 150$") && (price < 100 || price > 150)) return false
                if (filters.price.has("Over 150$") && (price < 150)) return false

            }

            return true;
        })
    }, [products, filters])

    return filteredProducts;
}
export default useFilteredProducts
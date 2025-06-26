export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { items: [] };
};

export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCartFromLocalStorage = () => {
    localStorage.removeItem("cart");
};

export const addProductToLocalCart = (productId, color, size, quantity = 1) => {
    const cart = getCartFromLocalStorage();
    const existingItem = cart.items.find((item) => item.productId === productId);
    console.log(existingItem?.size)

    if (existingItem) {
        existingItem.quantity += quantity;
        // existingItem.color += color
        // existingItem.size += size
    } else {
        cart.items.push({ productId, color, size, quantity });
    }

    saveCartToLocalStorage(cart);
    return cart;
};

export const removeProductFromLocalCart = (productId) => {
    const cart = getCartFromLocalStorage();
    cart.items = cart.items.filter((item) => item.productId !== productId);
    saveCartToLocalStorage(cart);
    return cart;
};
export const reduceQuantityFromLocalCart = (productId, color, size) => {
    const cart = getCartFromLocalStorage();
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
        existingItem.quantity -= 1;
    }
    saveCartToLocalStorage(cart);
    return cart;
};
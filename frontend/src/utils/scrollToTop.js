export const scrollTo = (top = 0) => {
    window.scrollTo({
        top,
        behavior: "smooth",
    });
};
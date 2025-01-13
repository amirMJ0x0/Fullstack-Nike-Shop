import { useColorMode } from "@chakra-ui/react";

const useThemeSwitcher = () => {
    const { colorMode, setColorMode } = useColorMode();

    const changeTheme = (e) => {
        const mode = e.target.value;

        if (mode === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setColorMode(prefersDark ? "dark" : "light");
        } else {
            setColorMode(mode);
        }
    };

    return { colorMode, changeTheme };
};

export default useThemeSwitcher;

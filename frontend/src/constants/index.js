import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";
import { BiUser, BiHeart, BiComment } from "react-icons/bi";
import { RiShoppingCart2Line } from "react-icons/ri";

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about-us", label: "About Us" },
];

// export const productFilters = [
//     { label: "Gender", filterType: "gender", options: ["Men", "Women", "Unisex"], values: ["Men", "Women", "Unisex"] },
//     { label: "Size", filterType: "size", options: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"], values: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"] },
//     { label: "Color", filterType: "color", options: ["Red", "Blue", "Green", "Black", "White"], values: ["Red", "Blue", "Green", "Black", "White"] },
//     { label: "Shop by Price", filterType: "price", options: ["0$ - 25$", "25$ - 50$", "50$ - 100$", "100$ - 150$", "Over 150$"], values: ["0-25", "25-50", "50-100", "100-150", "over-150"] },
//     { label: "Sale", filterType: "sale", options: ["Sale"], values: ["true"] },
// ]
export const productFilters = [
    {
        label: "Gender",
        filterType: "gender",
        options: [
            { label: "Men", value: "Men" },
            { label: "Women", value: "Women" },
            { label: "Unisex", value: "Unisex" },
        ],
    },
    {
        label: "Size",
        filterType: "size",
        options: [...Array(11)].map((_, i) => ({
            label: (35 + i).toString(),
            value: (35 + i).toString(),
        })),
    },
    {
        label: "Color",
        filterType: "color",
        options: ["Red", "Blue", "Green", "Black", "White"].map((color) => ({
            label: color,
            value: color,
        })),
    },
    {
        label: "Shop by Price",
        filterType: "price",
        options: [
            { label: "0$ - 25$", value: "0-25" },
            { label: "25$ - 50$", value: "25-50" },
            { label: "50$ - 100$", value: "50-100" },
            { label: "100$ - 150$", value: "100-150" },
            { label: "Over 150$", value: "over-150" },
        ],
    },
    {
        label: "Sale",
        filterType: "sale",
        options: [{ label: "Sale", value: true }], // Boolean instead of string
    },
];

export const statistics = [
    { num: 1000, value: '1k+', label: 'Brands' },
    { num: 500, value: '500+', label: 'Shops' },
    { num: 250, value: '250k+', label: 'Customers' },
];


export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];

export const colors = [
    { name: "Blue", className: "blue.500" },
    { name: "Red", className: "red.500" },
    { name: "Black", className: "black" },
    { name: "White", className: "white" },
    { name: "Orange", className: "orange.500" },
    { name: "Gray", className: "gray.500" },
    { name: "Silver", className: "slate.500" },
    { name: "Green", className: "green.500" },
    { name: "Yellow", className: "yellow.500" },
    { name: "Cyan", className: "cyan.500" },
    { name: "Pink", className: "pink.500" },
]


export const profileLinks = [
    {
        to: "account-info",
        label: "Account Info",
        icon: BiUser,
    },
    {
        to: "orders",
        label: "My Orders",
        icon: RiShoppingCart2Line,
    },
    {
        to: "my-favorites",
        label: "My Favorites",
        icon: BiHeart,
    },
    {
        to: "my-comments",
        label: "My Reviews",
        icon: BiComment,
    },
];

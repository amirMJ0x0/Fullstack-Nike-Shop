const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : " bg-coral-red  text-white border-coral-red"
      } rounded-full`}
    >
      {label}
      {iconURL && (
        <img src={iconURL} alt="" className="ml-2 rounded-full size-5" />
      )}
    </button>
  );
};

export default Button;

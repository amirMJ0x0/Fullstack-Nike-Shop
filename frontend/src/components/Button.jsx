import { useNavigate } from "react-router-dom";

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  to,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`flex items-center justify-center gap-2 px-3 py-2 md:px-7 md:py-4 border font-montserrat text-sm md:text-lg leading-none ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : " bg-coral-red  text-white border-coral-red"
      } rounded-full ${fullWidth && "w-full"}`}
      onClick={() => navigate(to)}
    >
      {label}
      {iconURL && (
        <img src={iconURL} alt="" className="md:ml-2 rounded-full size-5" />
      )}
    </button>
  );
};

export default Button;

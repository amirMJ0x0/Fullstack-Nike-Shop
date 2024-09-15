const Button = ({ label, iconURL }) => {
  return (
    <button className="flex items-center justify-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-coral-red rounded-full text-white border-coral-red">
      {label}
      <img src={iconURL} alt="" className="ml-2 rounded-full size-5" />
    </button>
  );
};

export default Button;

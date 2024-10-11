const ServiceCard = ({ imgURL, label, subtext }) => {
  return (
    <div
      className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rouded-[20px] px-10 py-16 shodow-3xl"
      data-aos="flip-down"
    >
      <div className="flex size-11 justify-center items-center bg-coral-red rounded-full">
        <img src={imgURL} alt={label} width={24} height={24} />
      </div>
      <h3 className="font-palanquin font-bold leading-normal text-3xl mt-5">
        {label}
      </h3>
      <p className="info-text mt-3 break-words">{subtext}</p>
    </div>
  );
};

export default ServiceCard;

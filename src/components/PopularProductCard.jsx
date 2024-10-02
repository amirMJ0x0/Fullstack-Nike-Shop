import { star } from "../assets/icons";

const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    <div
      className="flex flex-1 flex-col w-full max-sm:w-full"
      data-aos="fade-up"
    >
      <img src={imgURL} alt={name} className="size-[280px]" />
      <div className="mt-8 flex justify-start gap-2.5">
        <img src={star} alt="shoe rating" width={24} height={24} />
        <p className="text-lg leading-normal text-slate-gray font-montserrat">
          (4.5)
        </p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
        {name}
      </h3>
      <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
        {price}
      </p>
    </div>
  );
};

export default PopularProductCard;

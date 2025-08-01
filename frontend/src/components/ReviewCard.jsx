import { star } from "../assets/icons";

const ReviewCard = ({ feedback, rating, imgURL, customerName }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        src={imgURL}
        alt={"customer"}
        className="rounded-full object-cover size-[120px] "
      />
      <p className="mt-6 max-w-sm text-center info-text">{feedback}</p>
      <div className="mt-3 flex justify-center items-center gap-2.5">
        <img
          src={star}
          alt=""
          width={24}
          height={24}
          className="object-contain m-0"
        />
        <p className="text-xl font-montserrat text-slate-gray">({rating})</p>
      </div>
      <h3 className="font-palanquin text-3xl font-bold mt-1">{customerName}</h3>
    </div>
  );
};

export default ReviewCard;

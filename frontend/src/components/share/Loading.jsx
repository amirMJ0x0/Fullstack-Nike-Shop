import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="  animate-spin text-4xl text-coral-red max-container">
        <CgSpinner />
      </div>
    </div>
  );
};

export default Loading;

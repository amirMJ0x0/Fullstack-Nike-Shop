import { Button } from "@chakra-ui/react";

const Subscribe = () => {
  return (
    <section
      className="max-container flex justify-between items-center max-lg:flex-col gap-10 "
      id="contact-us"
    >
      <h3 className="leading-[68px] text-4xl lg:max-w-md font-bold font-palanquin">
        Sign Up for <span className="text-coral-red">Updates</span> &
        Newsletters
      </h3>
      <div className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
        <input
          type="text"
          placeholder="subscribe@nike.com"
          className="input !bg-transparent"
        />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button
            w={"full"}
            rounded={"full"}
            bg={"coral"}
            color={"white"}
            className="py-8"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;

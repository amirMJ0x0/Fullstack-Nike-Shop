import { copyrightSign } from "../assets/icons";
import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    <section className="bg-black padding-x padding-t pb-8">
      <footer className="max-container">
        <div className="flex justify-between items-start flex-wrap max-lg:flex-col gap-7">
          <div className="flex flex-col justify-center">
            <a href="/">
              <img src={footerLogo} alt="" width={150} height={46} />
            </a>
            <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
              Get shoes ready for the new term at your nearest Nike store. Find
              Your perfect Size In Store. Get Rewards
            </p>
            <div className="flex items-center gap-5 mt-8">
              {socialMedia.map((icon, index) => (
                <div
                  className="flex justify-center items-center size-12 bg-white rounded-full"
                  key={index}
                >
                  <img src={icon.src} alt={icon.alt} width={24} height={24} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-10 flex-wrap max-sm:mt-14">
            {footerLinks.map((section, index) => (
              <div className="" key={index}>
                <h4 className="text-white font-montserrat text-2xl leading-normal font-medium mb-6">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className="mt-2 text-white-400 font-montserrat text-base leading-normal hover:text-slate-gray cursor-pointer"
                      key={link.name}
                    >
                      <a href={link.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
            <img
              src={copyrightSign}
              alt="copty right sign"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>Copyright. All rights reserved.</p>
          </div>
          <div className="font-montserrat cursor-pointer">
            Terms & Conditions
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

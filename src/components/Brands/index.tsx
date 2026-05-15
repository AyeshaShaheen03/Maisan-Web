import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import { useTranslations } from "next-intl";


const Brands = () => {
  return (
    <section className="pt-100">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;
  const t = useTranslations("Brands");

  return (



    <div className="block items-center justify-center">
    <div className="grid items-center justify-center ">
        <Image src={imageLight} alt={name} width={150} height={150} className="items-center justify-center" />
      </div>
    {/* <div className="relative h-20 w-20 px-50 items-center justify-center">

    </div> */}
       <SectionTitle 
          title=""
          width="100%"
          paragraph={t("desc")}
          center
          mb="20px"
        />
    </div>


  );
};

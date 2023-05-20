import Image from "next/image";

const CreateComic = () => {
  return (
    <div>
      <div>
        <Image
          src="/svgs/arrow-back.svg"
          width={18}
          height={20}
          alt="arrow left"
        />
      </div>
    </div>
  );
};

export default CreateComic;

import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      src="/images/icon.svg"
      className="w-fit mx-auto"
      width={151}
      height={151}
      alt="my avatar"
    />
  );
};

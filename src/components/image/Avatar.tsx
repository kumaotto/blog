import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      src="/images/icon.svg"
      className="mx-auto"
      width={151}
      height={151}
      alt="my avatar"
    />
  );
};

import "./Header.css";

type Props = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="font-bold mb-2.5">{title}</h1>
      <p className="text-[19px] text-[#636869] mt-0">{subtitle}</p>
    </>
  );
};

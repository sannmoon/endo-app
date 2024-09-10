type Props = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2.5">{title}</h1>
      <p className="text-[19px] text-[#636869] mt-0 mb-6">{subtitle}</p>
    </>
  );
};

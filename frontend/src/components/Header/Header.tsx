import "./Header.css";

type Props = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">{subtitle}</p>
    </>
  );
};

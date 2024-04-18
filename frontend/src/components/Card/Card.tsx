import "./Card.css";

type Props = {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
};
export const Card = ({ imageUrl, title, description, onClick }: Props) => {
  return (
    <div className="container-card" onClick={onClick}>
      <div className="image-card">
        <img src={imageUrl} />
      </div>
      <div className="result-card">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

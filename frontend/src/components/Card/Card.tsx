import "./Card.css";

type Props = {
  imageUrl: string;
  title: string;
  description: string;
};
export const Card = ({ imageUrl, title, description }: Props) => {
  return (
    <div className="container-card">
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

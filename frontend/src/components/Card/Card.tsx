type Props = {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
};
export const Card = ({ imageUrl, title, description, onClick }: Props) => {
  return (
    <div
      className="bg-white flex w-full max-w-[1000px] cursor-pointer shadow-md"
      onClick={onClick}
    >
      <div className="w-1/2">
        <img className="w-full h-full object-cover" src={imageUrl} />
      </div>
      <div className="w-full">
        <h2 className="font-bold text-2xl my-5 pt-5 py-5 pl-5 pb-0">{title}</h2>
        <p className=" text-[19px] py-1.5 px-5 text-justify [word-spacing: normal] whitespace-pre-line text-[#636869]">
          {description}
        </p>
      </div>
    </div>
  );
};

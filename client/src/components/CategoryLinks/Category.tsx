import { Link } from "react-router-dom";

type CategoryProps = {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  link: string;
  overlay?: string;
};

const Category = ({
  imageSrc,
  altText,
  title,
  description,
  link,
  overlay,
}: CategoryProps) => {
  return (
    <div className="category">
      <Link to={link} className="btn-link">
        <img src={imageSrc} alt={altText} />
        <div className="info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {overlay && <div className="overlay">{overlay}</div>}
      </Link>
    </div>
  );
};

export default Category;

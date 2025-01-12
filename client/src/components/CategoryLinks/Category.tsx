import { Link } from "react-router-dom";

type CategoryProps = {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  link: string;
};

const Category = ({
  imageSrc,
  altText,
  title,
  description,
  link,
}: CategoryProps) => {
  return (
    <div className="category">
      <img src={imageSrc} alt={altText} />
      <div className="overlay">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={link} className="btn-link">
          Shop
        </Link>
      </div>
    </div>
  );
};

export default Category;

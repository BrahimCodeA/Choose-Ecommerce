import "./SliderNavTwo.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderNavTwoSettings } from "@/config/sliderNavTwoSettings";
import { icons, titles } from "@/constants/sliderNavTwoData";

export default function SliderNavTwo() {
  return (
    <nav className="navbar-2">
      <Slider {...sliderNavTwoSettings}>
        {icons.map((icon, index) => (
          <div key={index} className="navbar2-items">
            <span>{icon}</span>
            <h4>{titles[index % titles.length]}</h4>
          </div>
        ))}
      </Slider>
    </nav>
  );
}

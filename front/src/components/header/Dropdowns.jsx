// import Arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Dropdowns = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/news/${category}`);
  };

  return (
    <div className="dropdown_complete">

      <div className="dropdown_complete_first">
        <div className="drop_item_heading">
          <h2 className="flex flex-row items-center gap-[5px] text-[18px] text-white">
            Latest News{" "}
            <svg
              data-v-9493e270=""
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              alt="arrow"
              className="arrow_of_item text-fg-default rotate-270 group-hover:rotate-90 group-hover:text-fg-inverted transition text-uiMWeak"
            >
              <path
                data-v-9493e270=""
                d="M9.08 3.61a.2.2 0 01.284 0l.777.779a.2.2 0 010 .283L6.944 7.868a.2.2 0 000 .283l3.196 3.197a.2.2 0 010 .283l-.777.778a.2.2 0 01-.283 0L4.822 8.15a.2.2 0 010-.283l4.259-4.257z"
                fill="currentColor"
              ></path>
            </svg>{" "}
          </h2>
        </div>

        <div className="dropdown_menus">
          <ul>
            <li onClick={() => handleCategoryClick("cryptocurrencies")}>
              CRYPTO CURRENCIES
            </li>
            <li onClick={() => handleCategoryClick("nft")}>NFT NEWS</li>
            <li onClick={() => handleCategoryClick("ai")}>AI NEWS</li>
            <li onClick={() => handleCategoryClick("metaverse")}>META VERSE</li>
            {/* <Link to="/policyandregulations">
              {" "}
              <li>POLICY AND REGULATIONS</li>
            </Link> */}
          </ul>
        </div>
      </div>

      
      <div className="dropdown_complete_first">
        <div className="drop_item_heading">
          <h2 className="flex flex-row items-center gap-[5px] text-[18px] text-white">
            Tools
            <svg
              data-v-9493e270=""
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              alt="arrow"
              className="arrow_of_item text-fg-default rotate-270 group-hover:rotate-90 group-hover:text-fg-inverted transition text-uiMWeak"
            >
              <path
                data-v-9493e270=""
                d="M9.08 3.61a.2.2 0 01.284 0l.777.779a.2.2 0 010 .283L6.944 7.868a.2.2 0 000 .283l3.196 3.197a.2.2 0 010 .283l-.777.778a.2.2 0 01-.283 0L4.822 8.15a.2.2 0 010-.283l4.259-4.257z"
                fill="currentColor"
              ></path>
            </svg>{" "}
          </h2>
        </div>

        <div className="dropdown_menus">
          <ul>
            <Link to="/fearandgreed">
              <li>FEAR & GREED INDEX</li>
            </Link>
            <Link to="/rambochart">
              <li>RAMBO CHART</li>
            </Link>
            <Link to="https://dune.com/home">
              <li>DUNE</li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="dropdown_complete_first">
        <div className="drop_item_heading">
          <Link to="/blog">
            <h2 className="flex flex-row items-center gap-[5px] text-[18px] text-white">
              Blogs
            </h2>
          </Link>
        </div>
      </div>

      <div className="dropdown_complete_first">
        <div className="drop_item_heading">
          <Link to="/form">
            <h2 className="flex flex-row items-center gap-[5px] text-[18px] text-white">
              Submit
            </h2>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Dropdowns;

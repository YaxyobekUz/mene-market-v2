import React from "react";
import { Link } from "react-router-dom";

// Utils
import {
  formatDate,
  formatTime,
  getRandomNumber,
  getPercentageBgColor,
} from "../utils";
import { notification } from "../notification";

const StreamItem = ({ data = {} }) => {
  const product = data?.product_id || {};
  const percentage = getRandomNumber(0, 99);
  const url = `menemarket.uz/oqim/${data._id}`;

  // Handle stream URL copy
  const handleCopy = (e) => {
    const button = e.currentTarget;
    button.disabled = true;

    notification.success("Havoladan nusxa olindi");
    navigator.clipboard.writeText("https://" + url);
    setTimeout(() => (button.disabled = false), 1500);
  };

  return (
    <li className="space-y-0.5">
      {/* Top */}
      <div className="flex items-center justify-between gap-[1px] bg-white p-3.5 rounded-t-lg sm:p-4 sm:gap-2">
        <h3 className="text-[15px] font-semibold truncate xs:text-base sm:text-lg">
          Mening oqimim #{getRandomNumber(0, 99)}
        </h3>

        <div
          className={`${getPercentageBgColor(
            percentage
          )} rounded-full px-2 py-0.5 text-white text-[13px] max-sm:leading-[18px] sm:text-sm`}
        >
          {percentage}%
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col justify-between h-[180px] bg-white px-3.5 py-3 sm:h-[196px] sm:p-4">
        {/* Product */}
        <div className="space-y-1">
          <b className="font-medium text-[15px] sm:text-[17px]">Mahsulot</b>
          <Link
            to={`/products/product/${product._id}`}
            className="line-clamp-2 text-neutral-500 text-[15px] transition-colors duration-200 hover:text-primary-default sm:text-base"
          >
            {product.title}
          </Link>
        </div>

        <div className="space-y-3.5">
          {/* Url */}
          <div className="bg-gradient-gray py-2 px-3 rounded-lg">
            <div className="overflow-hidden text-sm sm:text-base">{url}</div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-end gap-3.5">
            <span className="text-neutral-500 text-sm">
              {formatDate(product.created_at)}
            </span>

            <span className="text-neutral-500 text-sm">
              {formatTime(product.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Sub */}
      <div className="flex items-center justify-between gap-3.5 bg-white p-3.5 rounded-b-lg sm:p-4">
        <button
          onClick={handleCopy}
          className="btn-primary w-full h-10 font-normal text-sm xs:text-base"
        >
          Nusxa olish
        </button>
      </div>
    </li>
  );
};

export default StreamItem;

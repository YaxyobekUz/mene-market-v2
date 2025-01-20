import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Data
import products from "../data/products";
import addresses from "../data/addresses";

// Redux
import { useDispatch } from "react-redux";

// Utils
import { getRandomNumber } from "../utils";

// Toaster (For notification)
import { notification } from "../notification";

// Swiper
import "swiper/css";
import "../css/swiper.css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Services
import orderService from "../api/services/orderService";
import productService from "../api/services/productService";

// Components
import Icon from "../components/Icon";
import CopyButton from "../components/CopyButton";
import DotsLoader from "../components/DotsLoader";
import ProductItem from "../components/ProductItem";
import LoadingText from "../components/LoadingText";
import FormInputWrapper from "../components/FormInputWrapper";

// Images
import likeIcon from "../assets/images/icons/like.svg";
import copyIcon from "../assets/images/icons/copy.svg";
import shareIcon from "../assets/images/icons/share.svg";
import reloadIcon from "../assets/images/icons/reload.svg";
import complaintIcon from "../assets/images/icons/complaint.svg";
import yellowStarIcon from "../assets/images/icons/mono-star-filled.svg";
import grayStarIcon from "../assets/images/icons/mono-gray-star-filled.svg";

const renderStars = (rating = 5, showRatingValue = true, size = 16) => {
  const value = Number(Math.round(rating)) || 5;

  return (
    <div className="flex items-center gap-3.5 shrink-0">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }, (_, i) =>
          value > i ? (
            <Icon
              key={i}
              alt="Like icon"
              size={size || 16}
              src={yellowStarIcon}
              className="aspect-square"
              style={{ width: `${size || 16}px`, height: `${size || 16}px` }}
            />
          ) : (
            <Icon
              key={i}
              alt="Like icon"
              size={size || 16}
              src={grayStarIcon}
              className="aspect-square"
              style={{ width: `${size || 16}px`, height: `${size || 16}px` }}
            />
          )
        )}
      </div>

      {showRatingValue && (
        <span className="text-neutral-400">{rating || 5}</span>
      )}
    </div>
  );
};

const navButtons = [
  { name: "about", text: "Mahsulot haqida" },
  { name: "reviews", text: "Sharhlar" },
];

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [activeNavButton, setActiveNavButton] = useState(navButtons[0].name);
  const { _id: id, title, images, price, desc: description } = product || {};
  const [formData, setFormData] = useState({
    client_name: "",
    client_mobile: "",
    client_address: "",
  });

  // Load products
  const loadProduct = () => {
    const validId = productId?.length > 16;

    if (!validId) {
      setTimeout(() => {
        notification.error("Mahsulot topilmadi");
      }, 0);

      setHasError(true);
      setIsLoading(false);
      return;
    }

    setHasError(false);
    setIsLoading(true);

    productService
      .getProduct(productId)
      .then((product) => setProduct(product))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (isLoadingOrder) return;

    const {
      client_name: name,
      client_mobile: tel,
      client_address: address,
    } = formData || {};

    const addressKey = Number(address);

    if (name?.length < 3)
      return notification.error("Ismingizni to'g'ri kiriting");
    if (tel?.length !== 19)
      return notification.error("Tel raqamingizni to'g'ri kiriting");
    if (addressKey < 0 || addressKey > 14)
      return notification.error("Manzil kodi xato");

    setIsLoadingOrder(true);

    orderService
      .createOrder(productId, formData)
      .then(() => navigate("/success"))
      .catch(() => notification.error("Nimadir xato ketdi"))
      .finally(() => setIsLoadingOrder(false));
  };

  // Update form data based on input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    if (product?._id !== productId) {
      loadProduct();
    } else {
      setTimeout(() => {
        setHasError(false);
        setIsLoading(false);
      }, 500);
    }
  }, [location.pathname]);

  return (
    <div className="py-6 sm:py-10">
      {/* Content */}
      {product && !hasError && !isLoading ? (
        <>
          {/* Product Main Content */}
          <div className="pb-4 sm:pb-8">
            <div className="container !px-0 sm:space-y-6 md:space-y-8 md:!px-5">
              {/* Product title & Actions */}
              <div className="hidden flex-col items-start justify-between gap-5 px-3.5 sm:flex xs:px-4 sm:flex-row sm:gap-10 md:px-0">
                {/* Product Title */}
                <h1 className="text-lg leading-6 sm:leading-7 sm:text-xl md:leading-8 md:text-2xl">
                  {title || "Mahsulot sarlavhasi"}
                </h1>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3.5 w-full sm:justify-normal sm:w-auto">
                  {/* Like */}
                  <button
                    aria-label="Toggle like button"
                    className="btn size-10 bg-gray-light rounded-full hover:bg-neutral-200 xs:size-11"
                  >
                    <Icon
                      src={likeIcon}
                      alt="Like icon"
                      className="size-5 xs:size-6"
                    />
                  </button>

                  {/* Share */}
                  <button
                    aria-label="Toggle like button"
                    className="btn size-10 bg-gray-light rounded-full hover:bg-neutral-200 xs:size-11"
                  >
                    <Icon
                      src={shareIcon}
                      alt="Share icon"
                      className="size-5 xs:size-6"
                    />
                  </button>

                  {/* Complaint */}
                  <button
                    aria-label="Open complaint modal button"
                    className="btn size-10 bg-red-50 rounded-full hover:bg-red-100 xs:size-11"
                  >
                    <Icon
                      src={complaintIcon}
                      alt="Complaint icon"
                      className="size-5 xs:size-6"
                    />
                  </button>
                </div>
              </div>

              {/* Product main content */}
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Product images */}
                <div className="flex gap-5 w-full h-96 sm:h-[425px] md:h-auto">
                  {/* Swiper */}
                  <Swiper
                    loop={true}
                    navigation={true}
                    spaceBetween={-2}
                    slidesPerView="auto"
                    breakpoints={{
                      425: { spaceBetween: 0 },
                      640: { spaceBetween: 2 },
                      768: { spaceBetween: 4 },
                    }}
                    centeredSlides={true}
                    modules={[Navigation]}
                    pagination={{
                      el: ".main-swiper-pagination",
                      clickable: true,
                    }}
                    className="product-page-swiper default-swiper-navigation-buttons size-full rounded-xl"
                  >
                    {[...images, ...images, ...images, ...images].map(
                      (img, index) => (
                        <SwiperSlide
                          key={index}
                          style={{ backgroundImage: `url(${img})` }}
                          className="!flex items-center justify-center !w-auto !h-full aspect-[3/4] bg-gray-light bg-cover bg-center bg-no-repeat rounded-xl"
                        />
                      )
                    )}
                  </Swiper>
                </div>

                {/* Details */}
                <div className="w-full space-y-6 px-3.5 xs:px-4 md:max-w-md md:min-w-96 md:px-0">
                  {/* ID & Rating */}
                  <div className="flex items-center justify-between">
                    {/* ID */}
                    {
                      <CopyButton
                        text={id || "ID raqam mavjud emas!"}
                        notificationText="ID raqamdan nusxa olindi"
                        className="flex items-center gap-1.5 transition-opacity duration-200 disabled:opacity-50"
                      >
                        <span>ID: </span>

                        <span className="inline-block max-w-24 truncate overflow-hidden text-neutral-400">
                          {id || "ID raqam mavjud emas!"}
                        </span>

                        <Icon
                          src={copyIcon}
                          alt="Copy icon"
                          className="size-5 xs:size-6"
                        />
                      </CopyButton>
                    }

                    {/* Rating */}
                    {renderStars(4.1)}
                  </div>

                  {/* Product title & Actions (For mobile) */}
                  <div className="flex flex-col items-start gap-5 sm:hidden">
                    {/* Product Title */}
                    <h1 className="text-lg leading-6">
                      {title || "Mahsulot sarlavhasi"}
                    </h1>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3.5 w-full sm:justify-normal sm:w-auto">
                      {/* Like */}
                      <button
                        aria-label="Toggle like button"
                        className="btn size-10 bg-gray-light rounded-full hover:bg-neutral-200 xs:size-11"
                      >
                        <Icon
                          src={likeIcon}
                          alt="Like icon"
                          className="size-5 xs:size-6"
                        />
                      </button>

                      {/* Share */}
                      <button
                        aria-label="Toggle like button"
                        className="btn size-10 bg-gray-light rounded-full hover:bg-neutral-200 xs:size-11"
                      >
                        <Icon
                          src={shareIcon}
                          alt="Share icon"
                          className="size-5 xs:size-6"
                        />
                      </button>

                      {/* Complaint */}
                      <button
                        aria-label="Open complaint modal button"
                        className="btn size-10 bg-red-50 rounded-full hover:bg-red-100 xs:size-11"
                      >
                        <Icon
                          src={complaintIcon}
                          alt="Complaint icon"
                          className="size-5 xs:size-6"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-lg">Mahsulot narxi:</p>

                    <div>
                      {/* discount price */}
                      <del className="text-neutral-400">
                        {price.toLocaleString()}
                      </del>

                      {/* current price */}
                      <p className="text-2xl font-semibold text-primary-default">
                        {price.toLocaleString()} so'm
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCreateOrder} className="space-y-5">
                    {/* First name */}
                    <FormInputWrapper
                      label="Ism *"
                      maxLength="72"
                      required={true}
                      name="first name"
                      placeholder="Falonchi"
                      disabled={isLoadingOrder}
                      onChange={(value) =>
                        handleInputChange("client_name", value)
                      }
                    />

                    {/* Phone number */}
                    <FormInputWrapper
                      type="tel"
                      maxLength="19"
                      required={true}
                      name="phone number"
                      label="Tel raqam *"
                      disabled={isLoadingOrder}
                      placeholder="+998 (__) ___-__-__"
                      onChange={(value) =>
                        handleInputChange("client_mobile", value)
                      }
                    />

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="address" className="inline-block pl-1.5">
                        Hudud*
                      </label>

                      <select
                        required
                        defaultValue={1}
                        className="h-11 px-3.5"
                        disabled={isLoadingOrder}
                        onChange={(e) =>
                          handleInputChange("client_address", e.target.value)
                        }
                      >
                        {addresses.map((address) => (
                          <option key={address.value} value={address.value}>
                            {address.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* submit btn */}
                    <button
                      disabled={isLoadingOrder}
                      className="btn-primary h-11 w-full rounded-xl font-normal xs:font-medium"
                    >
                      <LoadingText
                        text="Buyurtma berish"
                        loader={isLoadingOrder}
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details & Reviews */}
          <div className="py-6 sm:py-8">
            <div className="container space-y-6">
              {/* Nav Buttons */}
              <div className="flex items-center gap-5">
                {navButtons.map((btn, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setActiveNavButton(btn.name)}
                      className="btn text-neutral-500 py-2 text-base sm:text-lg"
                    >
                      {btn.text}
                    </button>

                    {/* Active line */}
                    <div
                      className={`"w-full h-0.5 rounded-full transition-colors duration-200 ${
                        activeNavButton === btn.name
                          ? "bg-primary-default"
                          : "bg-gray-light"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Product Description */}
              {activeNavButton === "about" && (
                <div className="max-w-5xl">
                  <p className="text-neutral-400">
                    {description || "Mahsulot izohi mavjud emas!"}
                  </p>
                </div>
              )}

              {/* Reviews & Rating */}
              {activeNavButton === "reviews" && (
                <div className="flex flex-col-reverse items-start gap-5 md:flex-row">
                  {/* Reviews */}
                  <div className="w-full">
                    <ul className="space-y-5">
                      {images.map((review, index) => {
                        return (
                          <li
                            key={index}
                            className="flex items-start gap-3.5 w-full bg-white p-3.5 rounded-xl border xs:p-4 xs:gap-4 sm:p-5 sm:gap-5"
                          >
                            {/* User avatar */}
                            <Icon
                              size={48}
                              src={review}
                              alt="User avatar"
                              className="size-10 shrink-0 bg-gray-light object-cover rounded-full xs:size-11 sm:size-12"
                            />

                            {/* details */}
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h3
                                  aria-label="Author name"
                                  className="font-medium line-clamp-1 text-base sm:text-lg"
                                >
                                  Abdusattor aka
                                </h3>

                                {renderStars(3, false)}
                              </div>

                              {/* description */}
                              <p className="text-neutral-400 text-sm xs:text-base">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Voluptatum minus provident
                                doloremque iure ab error tenetur, vel accusamus
                                ullam quod maiores soluta possimus eum vitae
                                fugiat aspernatur laboriosam a architecto.
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Rating */}
                  <div className="w-full space-y-5 md:max-w-md md:min-w-96">
                    <div className="w-full p-3.5 space-y-5 rounded-xl border xs:p-4 sm:p-5">
                      {/* header */}
                      <div className="flex items-center justify-between">
                        <b className="text-base font-medium sm:text-lg">
                          Reyting
                        </b>

                        {renderStars(4.1)}
                      </div>

                      {/* body */}
                      <ul className="space-y-1.5">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const randomNumber = getRandomNumber(10, 100);
                          return (
                            <li
                              key={index}
                              className="flex items-center gap-3.5"
                            >
                              <span className="w-2 text-center xs:w-2.5">
                                {index + 1}
                              </span>
                              <div className="grow h-2.5 bg-gray-light rounded-full xs:h-3.5">
                                <div
                                  style={{ width: `${randomNumber}%` }}
                                  className="h-full bg-primary-default rounded-full"
                                />
                              </div>
                              <span className="w-8 text-right text-sm xs:w-10 xs:text-base">
                                {randomNumber}%
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Open add review modal btn */}
                    <button className="btn-primary w-full h-11 rounded-xl font-normal xs:font-medium">
                      Sharh qoldirish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popular products */}
          <section className="py-6 sm:py-8">
            <div className="container space-y-6">
              {/* Section title */}
              <h2>Sizga yoqishi mumkin</h2>

              {/* Section content */}
              <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 md:gap-x-5 md:gap-y-8 lg:grid-cols-5">
                {products.slice(0, 5).map((product, index) => (
                  <ProductItem key={index} data={product} />
                ))}
              </ul>

              <div className="flex justify-center w-full pt-3.5 xs:pt-5">
                <button className="w-full bg-gray-light px-5 py-2 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-gray-medium/50 sm:w-auto sm:px-28 sm:text-lg md:px-32">
                  Ko'proq ko'rsatish
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Loading animation */}
      {!hasError && isLoading && (
        <div className="py-20">
          <DotsLoader color="#0085FF" />
        </div>
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center py-16">
          <button
            title="Reload"
            className="p-1.5"
            aria-label="Reload"
            onClick={loadProduct}
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;

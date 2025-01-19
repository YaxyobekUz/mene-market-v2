import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Services
import newsService from "../api/services/newsService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateNews } from "../store/features/newsSlice";

// Components
import Icon from "../components/Icon";
import DotsLoader from "../components/DotsLoader";
import ToggleEyeButton from "../components/ToggleEyeBtn";

// Images
import reloadIcon from "../assets/images/icons/reload.svg";
import boxIcon from "../assets/images/icons/box-gradient.svg";
import settingsIcon from "../assets/images/icons/settings.svg";
import starIcon from "../assets/images/icons/star-gradient.svg";
import infoIcon from "../assets/images/icons/info-gradient.svg";
import newsIcon from "../assets/images/icons/news-gradient.svg";
import crownIcon from "../assets/images/icons/crown-gradient.svg";
import walletIcon from "../assets/images/icons/wallet-gradient.svg";
import messagesIcon from "../assets/images/icons/messages-gradient.svg";
import telegramIcon from "../assets/images/icons/telegram-gradient.svg";
import NewsItem from "@/components/NewsItem";

const Dashboard = () => {
  const dispatch = useDispatch();
  const slicedNews = (news) => news?.slice(0, 4);
  const [hasError, setHasError] = useState(false);
  const allNews = useSelector((state) => state.news.data);
  const userData = useSelector((state) => state.user.data);
  const hideBalanceStorage = localStorage.getItem("hideBalance");
  const [isLoading, setIsLoading] = useState(allNews?.length === 0);
  const [filteredNews, setFilteredNews] = useState(slicedNews(allNews) || []);
  const [hideBalance, setHideBalance] = useState(hideBalanceStorage === "true");
  const { balance, name, username } = userData || {};

  const handleChangeHideBalance = () => {
    setHideBalance(!hideBalance);
    localStorage.setItem("hideBalance", String(!hideBalance));
  };

  const loadNews = () => {
    setHasError(false);
    setIsLoading(true);

    newsService
      .getNews()
      .then((news) => {
        dispatch(updateNews(news));
        setFilteredNews(slicedNews(news));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allNews?.length === 0) loadNews();
    else setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="w-full pt-3.5 space-y-4 xs:pb-8">
      {/* Top */}
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex items-center justify-between gap-1.5 bg-gradient-to-r from-gray-light to-gray-medium/20 px-4 py-5 rounded-xl xs:gap-4 lg:col-span-2 xl:col-span-3">
            {/* Profile */}
            <div className="flex items-center gap-4 min-w-0">
              <Icon
                alt="User avatar"
                className="size-12 rounded-full xs:size-14 md:size-16"
                src="https://i1.sndcdn.com/artworks-000360728946-bilq7t-t500x500.jpg"
              />

              {/* Details */}
              <div className="overflow-hidden space-y-0.5 xs:space-y-1">
                <h1 className="truncate text-[19px] font-semibold max-xs:leading-[30px] xs:text-xl md:text-[22px] lg:text-2xl">
                  {name || "Foydalanuvchi"}
                </h1>

                {/* Username */}
                <p className="text-neutral-400 truncate">
                  @{username || "foydalanuvchi_nomi"}
                </p>
              </div>
            </div>

            {/* Settings */}
            <Link
              aria-label="Settings"
              to="/admin/dashboard/settings"
              className="btn shrink-0 size-10 bg-white rounded-full sm:size-12"
            >
              <Icon src={settingsIcon} alt="Settings icon" />
            </Link>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between gap-1.5 relative h-24 bg-gradient-to-r from-gray-light to-gray-medium/20 rounded-xl p-4 md:py-5 md:h-auto">
            <div className="flex flex-col justify-between h-full md:justify-normal md:gap-1.5">
              <div className="text-base text-neutral-500 sm:text-lg">
                Balansingiz
              </div>

              <div className="text-lg font-medium sm:text-xl">
                {hideBalance ? "****" : Number(balance || 0).toLocaleString()}
                <span> so'm</span>
              </div>
            </div>

            {/* Toggle eye button */}
            <ToggleEyeButton
              hide={hideBalance}
              iconClassName="size-7"
              onClick={handleChangeHideBalance}
              className="size-10 shrink-0 top-2 right-1 bg-white rounded-full sm:size-12 lg:absolute lg:bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="container">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {/* Appeals */}
          <li className="opacity-50">
            <div className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-1 py-4 xs:px-4 sm:py-5">
              {/* icon */}
              <Icon
                size={40}
                src={messagesIcon}
                alt="Messages icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Murojaatlar
              </h3>
            </div>
          </li>

          {/* Contests */}
          <li>
            <Link
              to="/admin/dashboard/contests"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={starIcon}
                alt="Star icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Konkurslar
              </h3>
            </Link>
          </li>

          {/* History */}
          <li>
            <Link
              to="/admin/dashboard/balance-history"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={walletIcon}
                alt="Wallet icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Balans tarixi
              </h3>
            </Link>
          </li>

          {/* Appeals */}
          <li>
            <Link
              to="/admin/dashboard/donate"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={boxIcon}
                alt="Box icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Hayriya qutisi
              </h3>
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to="/admin/dashboard/about"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={infoIcon}
                alt="Info icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Dastur haqida
              </h3>
            </Link>
          </li>

          {/* Ads posts */}
          <li>
            <a
              target="_blank"
              href="https://t.me/menemarket"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={crownIcon}
                alt="Crown icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Reklama postlari
              </h3>
            </a>
          </li>

          {/* News */}
          <li>
            <Link
              to="/admin/dashboard/news"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={newsIcon}
                alt="News icon"
                className="size-9 sm:size-10"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Yangiliklar
              </h3>
            </Link>
          </li>

          {/* Telegram */}
          <li>
            <Link
              to="/admin/dashboard/telegram"
              className="flex flex-col items-center gap-3.5 bg-gradient-gray rounded-xl px-3.5 py-4 sm:px-4 sm:py-5"
            >
              {/* icon */}
              <Icon
                size={40}
                src={telegramIcon}
                className="size-9 sm:size-10"
                alt="Telegram logo icon"
              />

              {/* title */}
              <h3 className="text-center text-[15px] font-medium line-clamp-1 xs:text-base sm:text-lg">
                Telegram kanal
              </h3>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Latest news */}
      <div className="container max-xs:!px-0">
        <section className="bg-gradient-to-b p-4 pb-8 space-y-4 from-transparent to-gray-medium xs:pb-4 xs:from-gray-light xs:to-gray-medium/20 xs:rounded-xl">
          <h2 className="font-semibold text-xl">So'nggi yangiliklar</h2>

          {/* News */}
          {!hasError && !isLoading && filteredNews?.length > 0 ? (
            <ul className="space-y-3.5">
              {filteredNews.map((news) => (
                <NewsItem data={news} key={news._id} />
              ))}
            </ul>
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
                onClick={loadNews}
                aria-label="Reload"
              >
                <Icon src={reloadIcon} alt="Reload icon" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

const sheetName = "Asosiy";
const baseUrl = "https://api.samsara.com/";
const createUrl = (endpoint) => baseUrl + endpoint;
const token = "samsara_api_kPoGFfilZUPwFTraiT6F1xT1YmVC0G";

// Endpoints
const endpoints = {
  getVehicles: "fleet/vehicles?limit=512",
  getLocations: "fleet/vehicles/locations",
};

// Fetch and Write data
function fetchAndWriteData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const getOptions = {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    // Fetch API data
    const response = UrlFetchApp.fetch(
      createUrl(endpoints.getLocations),
      getOptions
    );
    const { data } = JSON.parse(response.getContentText()) || {};

    // Get existing data from the sheet
    const existingData = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 4)
      .getValues();

      
    const existingMap = {};
    existingData.forEach((row) => {
      const [id, name, speed, location] = row;
      existingMap[id] = { name, speed, location };
    });

    // Prepare headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["ID", "Name", "Speed", "Current location"]);
    }

    // Update or append new data
    data.forEach((item) => {
      const { id, name, location } = item || {};
      const { speed, reverseGeo } = location || {};
      const { formattedLocation } = reverseGeo || {};

      const newRow = [id, name, `${speed.toFixed(1)} km/h`, formattedLocation];

      if (existingMap[id]) {
        // If data exists, check for differences
        const oldData = existingMap[id];
        if (
          oldData.name !== name ||
          oldData.speed !== `${speed.toFixed(1)} km/h` ||
          oldData.location !== formattedLocation
        ) {
          // Find row index for update
          const rowIndex = existingData.findIndex((row) => row[0] === id) + 2; // +2 for header row

          // Ensure the range exists
          if (rowIndex > 1) {
            sheet.getRange(rowIndex, 1, 1, newRow.length).setValues([newRow]);
          }
        }
      } else {
        // Append new data if ID doesn't exist
        sheet.appendRow(newRow);
      }
    });
  } catch (error) {
    Logger.log("Xato yuz berdi: " + error.toString());
  }
}

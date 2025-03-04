import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "../components/Icon";
import DotsLoader from "../components/DotsLoader";
import StreamItem from "../components/StreamItem";

// Services
import streamService from "../api/services/streamService";

// Images
import reloadIcon from "../assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateStreams } from "../store/features/streamsSlice";

const Streams = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allStreams = useSelector((state) => state.streams.data);

  const loadStreams = () => {
    setHasError(false);
    setIsLoading(true);

    streamService
      .getStreams()
      .then((streams) => dispatch(updateStreams(streams)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!allStreams) loadStreams();
    else setTimeout(() => setIsLoading(false), 500);
    document.title = "Mene Market | Oqimlar";
  }, []);

  return (
    <div className="w-full pt-3.5 pb-8">
      <div className="container max-sm:px-1">
        <div className="bg-gradient-gray rounded-xl">
          {/* Title */}
          <div className="flex flex-wrap items-center justify-between h-[60px] px-2.5 sm:px-4">
            <h1 className="text-2xl">Oqimlar</h1>

            <Link
              to="/admin/streams/target-api"
              className="btn h-10 px-5 bg-white border rounded-full hover:text-primary-default max-sm:font-normal"
            >
              Target uchun API
            </Link>
          </div>

          {/* Line */}
          <div className="h-0.5 w-full bg-white" />

          {/* Streams */}
          {!hasError && !isLoading && allStreams?.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3.5 px-2.5 py-5 sm:px-4 xs:grid-cols-2 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
              {allStreams.map((stream, index) => (
                <StreamItem key={stream._id || index} data={stream} />
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
                aria-label="Reload"
                onClick={loadStreams}
              >
                <Icon src={reloadIcon} alt="Reload icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Streams;

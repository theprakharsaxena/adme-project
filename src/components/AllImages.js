import React from "react";
import { useInfiniteQueryGetPaginatedItemsList } from "../Query/paginatedImageList";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { FaDownload } from "react-icons/fa"

const AllImages = () => {
  const allImages = useInfiniteQueryGetPaginatedItemsList();

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "image.jpg";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Image download error:", error);
      });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={allImages?.data?.pages?.flatMap((data) => data).length || 0}
        next={allImages.fetchNextPage}
        hasMore={allImages.hasNextPage}
        loader={
          <CircularProgress
            sx={{
              alignSelf: "center",
              margin: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        }
      >
        {allImages.isLoading ? (
          <CircularProgress
            sx={{
              alignSelf: "center",
              margin: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        ) : allImages?.data?.pages?.[0]?.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allImages?.data?.pages
              ?.flatMap((data) => data)
              ?.map((image, index) => {
                return (
                  <div key={index}>
                    <div>
                      <div className="relative">
                        <img src={image?.download_url} />
                        <button
                        className="absolute right-2 bottom-2"
                          onClick={() => downloadImage(image?.download_url)}
                        >
                          <FaDownload className="text-green-500 text-4xl"/>
                        </button>
                      </div>
                      <h3 className=" font-serif text-slate-800">
                        Author: {image?.author}
                      </h3>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>No Images</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default AllImages;

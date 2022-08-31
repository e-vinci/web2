import React from "react";
//import { StaticImage } from "gatsby-plugin-image";

/**
 * Based on the URL of a youtube video, get the associated picture, fill the wrapper container
 * with this picture and make it clickable (hyperlink).
 * If the picture is not found, send only an Hyperlink
 * @param {*} param0
 * @returns
 */
const YoutubeImage = ({ src }) => {
  if (!src) return null;

  if (src.includes("youtu")) {
    // get the youtube id
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = src.match(regExp);
    if (match && match[2].length == 11) {
      //print a thumbnail
      const url = "https://img.youtube.com/vi/" + match[2] + "/hqdefault.jpg";
      return (
        <a href={src} target="_blank">
          <img
            src={url}
            style={{ width: "100%", zIndex: 2 }}
            alt="YoutubeImage"
          />
        </a>
      );
    } else {
      //error just print a link
      return (
        <a href={src} target="_blank">
          {src}
        </a>
      );
    }
  } else {
    return (
      <a href={src} target="_blank">
          {src}
      </a>
    );
  }
};

export default YoutubeImage;

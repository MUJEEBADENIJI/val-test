document.addEventListener("DOMContentLoaded", () => {
  const spaceId = "wpu6wl4smfmr";
  const accessToken = "wueSM4PC11tI-PyyCTCLHOE0oTe7OeE5cQqrncJmio4";
  const entryId = "5sCgZPww0AdNFt8Mv7MVnL";

  fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries/${entryId}?access_token=${accessToken}`)
    .then(res => res.json())
    .then(data => {
      console.log("fields:", data.fields);

      const imageUrl = data.fields.valimg; // ImageKit URL
      const videoUrl = data.fields.valVid; // video file URL from Contentful

      if (!imageUrl) return console.error("imageUrl missing");
      if (!videoUrl) return console.error("valVid missing");

      // set window.valData for loader + script.js
      window.valData = {
        imageUrl,
        valVid: videoUrl
      };

      // set image src
      const img = document.getElementById("val-img");
      if (!img) return console.error("img element not found");
      img.src = imageUrl;
    })
    .catch(console.error);
});

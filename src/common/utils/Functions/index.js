// get image path
export const getImageUrl = (imageName) => {
  const baseUrl = "http://192.168.1.165:8080/images/";
  return baseUrl + imageName;
};

export const onImageEdit = async (imgUrl) => {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new file([blob], "restaurantImg.jpg", {
    type: blob.type,
  });

  return file;
};

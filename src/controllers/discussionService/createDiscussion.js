const Discussion = require("../../models/Discussion");


const createDiscussion = async (req, res) => {
  try {
    const { text, hashTags } = req.body;
    const { image, otherImages } = req.files;
    const { _id: creatorId } = req.user;
    const fileName = `${creatorId}_${Date.now()}_upload`;

    const imageUrl = await uploadFileToS3Bucket(
      fileName,
      image[0].buffer,
      "image/jpeg"
    );

    let otherImagesUrl = [];
    if (otherImages?.length > 0) {
      otherImagesUrl = await Promise.all(
        otherImages.map((file, idx) =>
          uploadFileToS3Bucket(`${fileName}${idx}`, file.buffer, "image/jpeg")
        )
      );
    }

    const newDiscussion = new Discussion({
      creatorId,
      text,
      hashTags,
      image: fileName,
      otherImages: otherImages?.length || 0,
    });

    const savedDiscussion = await newDiscussion.save();

    return res.status(201).json(
      createResponse(true, "Discussion successfully created", {
        savedDiscussion,
        otherImagesUrl,
        imageUrl,
      })
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};
module.exports = { createDiscussion };

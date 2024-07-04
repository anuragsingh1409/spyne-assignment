const Discussion = require("../../models/Discussion");
const { NODE_ENV, S3_BASE_URL } = process.env;
const bucketFolder = NODE_ENV === "production" ? "prod" : "stage";

const updateDiscussion = async (req, res) => {
  try {
    const { text, hashTags } = req.body;
    const { image, otherImages } = req.files;
    const { _id: userId } = req.user;
    const { discussionId } = req.params;

    const discussion = await Discussion.findOne({
      creatorId: userId,
      _id: discussionId,
    });

    if (!discussion) {
      return res
        .status(404)
        .json("Discussion not found");
    }

    let imageUrl = `${S3_BASE_URL}/${bucketFolder}/${discussion.image}`;
    if (image) {
      imageUrl = await uploadFileToS3Bucket(
        discussion.image,
        image[0].buffer,
        "image/jpeg"
      );
    }

    let otherImagesUrl = [];
    if (otherImages?.length > 0) {
      otherImagesUrl = await Promise.all(
        otherImages.map((file, idx) =>
          uploadFileToS3Bucket(
            `${discussion.image}${idx}`,
            file.buffer,
            "image/jpeg"
          )
        )
      );
    }

    discussion.text = text;
    discussion.hashTags = hashTags;
    discussion.otherImages = otherImages?.length || 0;

    await discussion.save();

    return res.status(200).json({
      data: {
        ...discussion.toObject(),
        otherImagesUrl,
        imageUrl,
      },
      log: "Discussion successfully updated"
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json("Some server error occurred!");
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { discussionId } = req.params;

    const discussion = await Discussion.findOneAndDelete({
      creatorId: userId,
      _id: discussionId,
    });

    if (!discussion) {
      return res
        .status(400)
        .json("Discussion does not exist");
    }

    return res
      .status(200)
      .json("Discussion successfully deleted");
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(responseMessage.badRequest);
  }
};

module.exports = { updateDiscussion, deleteDiscussion };

const Discussion = require("../../models/Discussion");

const { NODE_ENV,  S3_URL} = process.env;
const bucketFolder = NODE_ENV === "prod" ? "prod" : "stage";

const fetchDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!discussion) {
      return res
        .status(404)
        .json(createResponse(false, "Discussion not found", null));
    }

    const {
      _id,
      creatorId,
      text,
      hashTags,
      views,
      otherImages,
      likeBy,
      commmentedBy,
      image,
    } = discussion;

    const otherImagesArray = Array.from(
      { length: otherImages },
      (_, i) =>
        `${S3_URL}/${bucketFolder}/${image}${i +
          1}`
    );
    const thumbnail = `${S3_URL}/${bucketFolder}/${image}`;

    const finalData = {
      _id,
      creatorId,
      text,
      hashTags,
      image: thumbnail,
      otherImages: otherImagesArray,
      views,
      totalLikes: likeBy?.length || 0,
      totalComments: commmentedBy?.length || 0,
    };

    return res
      .status(200)
      .json(createResponse(true, "Discussion successfully fetched", finalData));
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const fetchAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();

    if (!discussions) {
      return res
        .status(404)
        .json(createResponse(false, "Discussions not found", null));
    }

    const finalData = discussions.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;

      const otherImagesArray = Array.from(
        { length: otherImages },
        (_, i) =>
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i +
            1}`
      );
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;

      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });

    return res
      .status(200)
      .json(
        createResponse(true, "Discussions successfully fetched", finalData)
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const fetchDiscussionsByTags = async (req, res) => {
  try {
    const { hashTags } = req.query;
    const discussions = await Discussion.find({ hashTags: { $in: hashTags } });

    if (!discussions) {
      return res
        .status(404)
        .json(createResponse(false, "Discussions not found", null));
    }

    const finalData = discussions.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;

      const otherImagesArray = Array.from(
        { length: otherImages },
        (_, i) =>
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i +
            1}`
      );
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;

      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });

    return res
      .status(200)
      .json(
        createResponse(true, "Discussions successfully fetched", finalData)
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const fetchDiscussionsByTextSearch = async (req, res) => {
  try {
    const { text } = req.params;
    const discussions = await Discussion.find({
      text: { $regex: text, $options: "i" },
    });

    if (!discussions) {
      return res
        .status(404)
        .json(createResponse(false, "Discussions not found", null));
    }

    const finalData = discussions.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;

      const otherImagesArray = Array.from(
        { length: otherImages },
        (_, i) =>
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i +
            1}`
      );
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;

      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });

    return res
      .status(200)
      .json(
        createResponse(true, "Discussions successfully fetched", finalData)
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = {
  fetchDiscussion,
  fetchAllDiscussions,
  fetchDiscussionsByTags,
  fetchDiscussionsByTextSearch,
};

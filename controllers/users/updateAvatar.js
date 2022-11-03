const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${id}.${extension}`;
    const publicUpload = path.join(avatarsDir, filename);

    await fs.rename(tmpUpload, publicUpload);

    Jimp.read(publicUpload)
      .then((avatar) => avatar.resize(250, 250))
      .catch((err) => console.log(err));

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
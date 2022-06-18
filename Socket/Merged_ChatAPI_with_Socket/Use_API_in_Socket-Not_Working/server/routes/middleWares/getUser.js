const UserModel = require("../../models/User");

const getUser = async function getUser(req, res, next) {
	const fid = req.params.fid;
	// console.log(fid);
	if (fid) {
		req.user = await UserModel.findOne({ fid });
		if (!req.user) {
			return res.status(403).send("No User Found");
		}
	}
	// console.log(req.user);
	next();
};

module.exports = { getUser };

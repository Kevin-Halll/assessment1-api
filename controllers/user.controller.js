const { validateUser } = require("../services/user.validation");
const { JSONResponse } = require("../utilities/JSONResponse");
const User = require("../models/user.model");

/**
 * ### Description
 * Creating a user
 */
// exports.createUser = async (req, res) => {
//   try {
//     const email = await User.findOne({ email: req.body.email });
//     if (email) {
//       JSONResponse.error(res, "This email already exist", undefined, 409);
//     } else{
//       const {error, value} = validateUser(req.body);
// 	  if(error){
// 		console.log(error)
// 		JSONResponse.error(res, "Failure creating user.", error, 500);
// 	  }
//       const user = await User.create(req.body);
//       JSONResponse.success(res, "Success.", user, 200);
//     }
//   } catch (error) {
//     JSONResponse.error(res, "Failure handling user model.", error, 500);
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExists = await User.exists({ email });
    if (emailExists) {
      return JSONResponse.error(
        res,
        "This email already exists",
        undefined,
        409
      );
    }

    const { error, value } = validateUser(req.body);
    if (error) {
      let errorMsg = error.details.map((err) => {
        return { path: err.path[0], error_message: err.message };
      });
      console.log(errorMsg);
      return JSONResponse.error(res, "Failure creating user.", errorMsg, 500);
    }

    const user = await User.create(req.body);
    return JSONResponse.success(res, "Success.", user, 200);
  } catch (err) {
    return JSONResponse.error(res, "Failure handling user model.", err, 500);
  }
};

/**
 * ### Description
 * Retrieving all users
 */
// exports.getAllUsers = async (req, res) => {
// 	try {
// 		const user = await User.aggregate([{$match:{}}])
// 		JSONResponse.success(res, 'Success.', user, 200)
// 	} catch (error) {
// 		JSONResponse.error(res, "Failure handling user model.", error, 500)
// 	}
// }

exports.getAllUsers = async (req, res) => {
  try {
    // declare the format of the query params
    const searchQuery = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      contactNum: req.query.contactNum,
      status: req.query.status,
    };

    var searchResult = [];
    // remove the params that are undefined or have empty field request
    Object.keys(searchQuery).forEach((search) => {
      if (searchQuery[search] == undefined || searchQuery[search] == "") {
        delete searchQuery[search];
      }
      // boolean cannot do regex operations, hence the need to format is differently
      if (searchQuery[search] == "true" || searchQuery[search] == "false") {
        searchResult.push({ [search]: searchQuery[search] });
        delete searchQuery[search];
      }
    });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = (page - 1) * limit;

    const pipeline = [
      // your aggregation stages here
      {$skip: startIndex},
      {$limit: limit},
    ];

    // format the query for partial search in the database
    Object.keys(searchQuery).forEach((search) => {
      searchResult.push({
        [search]: { $regex: searchQuery[search], $options: "i" },
      });
    });

    const sortField = req.query.sortField || "_id";
    const sortOrder = req.query.sortOrder || "des";
    const sortObj = {};
    sortObj[sortField] = sortOrder === "asc" ? 1 : -1;

    const users = await User.aggregate(
		searchResult.length ?
		[
			searchResult.map((result) => {
				return {$match: result};
			})
		]
		:
		[
			{$match : {}},
			{$skip : startIndex},
			{$limit : limit},
			{$sort : sortObj},
		]
    );

    JSONResponse.success(
      res,
      "Success.",
      {
        users: users,
        page: page,
        limit: limit,
      },
      200
    );
  } catch (error) {
    JSONResponse.error(res, "Failure handling user model.", error, 500);
  }
};

/**
 * ### Description
 * Deleting a user
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    // if (user) await User.delete()
    JSONResponse.success(res, "Success.", user, 200);
  } catch (error) {
    JSONResponse.error(
      res,
      "Failure handling delete of user model.",
      error,
      500
    );
  }
};

/**
 * ### Description
 * Find a user by Id
 */
exports.findUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    JSONResponse.success(res, `Success.`, user, 200);
  } catch (error) {
    JSONResponse.error(res, "Failure handling user model.", error, 500);
  }
};

/**
 * ### Description
 * Updating a user
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    JSONResponse.success(res, "Success.", user, 200);
  } catch (error) {
    JSONResponse.error(res, "Failure handling user model.", error, 500);
  }
};

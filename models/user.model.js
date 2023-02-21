const db = require("mongoose");

// let UserSchema = new db.Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, "First name is required"],
//       validate: {
//         validator: (value) =>
//           /^[^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/.test(value),
//         message: "Invalid name type",
//       },
//     },
//     lastName: {
// 		type: String, required:
// 		[true, "Last name is required"],
// 		validate: {
// 			validator: (value) =>
// 				/^[^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/.test(value),
// 			message: "Invalid name type",
// 		},
// 	},
//     email: {
// 		type: String,
// 		required: [true, "Email is required"],
// 		validate: {
// 			validator: (value) =>
// 			/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
// 			message: "Invalid email",
// 		},
// 	},
//     contactNum: {
// 		type: String,
// 		required: [true, "Contact is required"],
// 		validate: {
// 			validator: (value) =>
// 			/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value),
// 			message: "Invalid contact number",
// 		},
// 	},
//     status: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

let UserSchema = new db.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNum: {
      type: String,
      required: true,
    },
    status: { type: Boolean, default: false },
    password: { type: String, },
  },
  { timestamps: true }
);

module.exports = db.model("User", UserSchema);

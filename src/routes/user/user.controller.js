const express = require("express");
const errorHandler = require("../../middleware/error");
const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");

const router = express.Router();
//get all users
router.get(
  "/",
  errorHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
  })
);
//Veiw profile of a specific user
router.get(
  "/:userId/viewprofile",
  errorHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });

    res.status(200).send(user);
  })
);
//login a user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const pass = await User.findOne({password: req.body.password });

  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (!pass) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    username: user.username,
    email: user.email
  });

  res.status(200).send({ message: "success", token });
});
//sign up
router.post("/signup", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let user = new User(payload);

  user = await user.save();
  res.status(200).send({ user });
});
//edit profile of a user
router.put("/:userId/editprofile",async (req,res)=>{

  console.log ('body', req.body ,req.params.userId)

    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body);
        console.log('json',user)
        res.json({ data: user, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
//delete a user
router.delete("/:userId/deleteuser",async (req,res)=>{

  try {
      const user = await User.findByIdAndDelete(req.params.userId);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;

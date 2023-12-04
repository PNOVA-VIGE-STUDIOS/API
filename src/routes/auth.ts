import passport from "passport";
import AuthService from "../services/auth.service";
import express from "express";

const router = express.Router();
const service = new AuthService();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const rta = await service.signToken(user);
      console.log(rta);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get("/google", passport.authenticate("google", {scope: ['email', 'profile']}));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.redirect("/");
  },
);
export default router;
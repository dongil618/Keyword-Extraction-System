import Keyword from "../models/Keyword";


export const home = (req, res) => res.render("home", {
  pageTitle: "Home"
});
export const dailyKeyword = (req, res) =>
  res.render("dailyKeyword", {
    pageTitle: "Daily Keyword"
  });
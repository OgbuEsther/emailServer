import express, { Application, Request, Response } from "express";
import cors from "cors";
import user from "./router/userroutes";
import ejs from "ejs"


const data = {
    name : "Esther",
    color : "red"

}


export const mainApp = async (app: Application) => {
  app.set("view engine", "ejs");
  app.use(express.json());
app.use(express.static(`${__dirname} ../public/css/Body.css`))
app.use(express.static(`${__dirname} ../public/assets`))
  app.use(cors());

  app.use("/api", user);
  app.get("/view", (req: Request, res: Response) => {
    res.render("index" , {data});
  });
};

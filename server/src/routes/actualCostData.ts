
import { Request, Response, Router } from "express";
import Actualcost from "../entity/Actualcost";
import Project from "../entity/Project";

import ProjectData from "../entity/ProjectData";
import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

/* get   total ActualPost by prijecr*/
   
const getActualCostsbyprojectID = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const { id } = req.body;
    console.log(id)
    try {
        const actualcost = await Actualcost.find({ where: { project:id } });
        console.log("actual data")
        console.log(actualcost)
        if (!actualcost) throw new Error("Ac not found");

    

        return res.status(200).json(actualcost);
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "Project not found":
                return res.status(404).json({ error: error.message });
            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};



const router = Router();


router.get("/:id", user, auth, getActualCostsbyprojectID);


export default router;

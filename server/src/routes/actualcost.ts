import { Request, Response, Router } from "express";
import Actualcost from "../entity/Actualcost";
import Project from "../entity/Project";

import ProjectData from "../entity/ProjectData";
import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";


const createActualCost = async (req: Request, res: Response) => {
    const { actualQuantity, unitActualCost,totalActualCost,projectdata,project } = req.body;
 
    let errors: any = {};
  
    try {

       // const user = await User.findOne(res.locals.user.id)
       // const project = await Project.findOne( res.locals.user.id)


    //    if (!Unit) errors.Unit = "cannot be empty !!";
    //     if (!itemDescription) errors.itemDescription = "cannot be empty !!";
        if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")
        console.log(" before Save")
        const data = await new Actualcost({actualQuantity,unitActualCost,totalActualCost,projectdata,project}).save()
       // const newProjectdata = await new ProjectData({ itemDescription,Unit ,Pro}).save()
        console.log(" After Save")
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
}





/****  GET PROJECTS */
const getActualCostALl = async (_: Request, res: Response) => {
    try {
      
      const actualCosts = await Actualcost.find();
     //console.log(articles)
      return res.status(200).json(actualCosts);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something went wrong" });
    }
  };



   const getAllProjectData = async (_:Request , res:Response)=>{

    try{
        const projectsdataAll = await ProjectData.find();
        return res.status(200).json(projectsdataAll);
        
    }catch(error){
        console.log("error");
        return res.status(500).json({ error: "something went wrong" });

    }
   }


   /* get Summ of total ActualPost*/
   
    const getActualCostsbyId = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const { id } = req.body;
    console.log(id)
    try {
        const actualcost = await Actualcost.find({ where: { projectdata:id } });
        console.log(actualcost)
        if (!actualcost) throw new Error("Projectdata not found");

        var cost=0;
        actualcost.forEach(element=>
         cost+= element.totalActualCost
        )
        console.log(cost)

        return res.status(200).json(cost);
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

/* get   total ActualPost by prijecr*/
   
const getActualCostsbyprojectID = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const { id } = req.body;
    console.log(id)
    try {
        const actualcost = await Actualcost.find({ where: { project:id } });
        console.log(actualcost)
        if (!actualcost) throw new Error("Projectdata not found");

    

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

router.get("/",user,auth,getActualCostALl)
router.get("/:id", user, auth, getActualCostsbyId);
router.get("/actualdata/:id", user, auth, getActualCostsbyprojectID);

router.post("/create", user, auth, createActualCost);
export default router;
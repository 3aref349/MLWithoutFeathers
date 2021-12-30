import { Request, Response, Router } from "express";
import Project from "../entity/Project";

import ProjectData from "../entity/ProjectData";
import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";




/****  GET PROJECTS */
const getProjects = async (_: Request, res: Response) => {
    try {

      const projects = await Project.find();
     //console.log(articles)
      return res.status(200).json(projects);

    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something went wrong" });
    }
  };
  

  const getProjectsdefault = async (_: Request, res: Response) => {
    try {

      const project = await Project.find( { order:{createdAt:"DESC"},take:1
    
    });
     console.log(project)
      return res.status(200).json(project);

    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something went wrong" });
    }
  };
  /****  GET PROJECTS WITH pROJ dATA */
//   const getProject = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     //const { id } = req.body;
//     console.log(id)
//     try {
//         const project = await Project.findOne({ where: { id },relations:["project"] });
//         console.log(project)
//         if (!project) throw new Error("Project not found");
//         return res.status(200).json(project);
//     } catch (error) {
//         switch (error.message) {
//             case "Project not found":
//                 return res.status(404).json({ error: error.message });
//             default:
//                 return res.status(500).json({ error: "something went wrong" });
//         }
//     }
// };
const getlastprojectId = async (req: Request, res: Response) => {
    // const { id } = req.params;
  const { name } = req.body;

     console.log( "before try")
    try {
        console.log( "after try")
        const project = await Project.findOne({ where: { Name:name }});
        const getId = project
        
   console.log(project)
        if (!project) throw new Error("Project not found");
        console.log("here")
        return res.status(200).json(getId);
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


const createProject = async (req: Request, res: Response) => {
    const { Name, location,contractualStartDate,contractualEndDate } = req.body;
    let errors: any = {};
    console.log(res.locals.user)
    try {
        const user = await User.findOne(res.locals.user.id)
        console.log("create Projct")
        console.log(Name);
        console.log(location);

        if (!Name) errors.Name = "cannot be empty !!";
        // if (!Location) errors.Location = "cannot be empty !!";
        if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")

        const newProject = await new Project({ Name, location, contractualStartDate,contractualEndDate,user }).save()

        return res.status(200).json(newProject);
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


const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
      console.log(id)
      try {
        const project = await Project.findOne(id);
        console.log(project)
        if (!project) throw new Error("article not found");
        return res.status(200).json(project);
      } catch (error) {
        switch (error.message) {
          case "article not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };

const router = Router();
router.get("/",user,auth,getProjects)
router.get("/default",user,auth,getProjectsdefault)
 router.get("/:id", user, auth, getProject);
router.put("/get", user, auth, getlastprojectId);

router.post("/", user, auth, createProject);



export default router;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer"; 
import { useSelector, useDispatch } from "react-redux"; 
import { useState, useEffect } from "react"; 
import { useParams } from "next/navigation"; 
import * as client from "../../client"; 
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap"; 
import { BsGripVertical } from "react-icons/bs"; 
import LessonControlButtons from "./LessonControlButtons"; 
import ModuleControlButtons from "./ModuleControlButtons"; 
import ModulesControls from "./ModulesControls";  

export default function Modules() { 
  const { cid } = useParams<{ cid: string }>(); 
  const [moduleName, setModuleName] = useState(""); 
  const { modules } = useSelector((state: any) => state.modulesReducer); 
  const dispatch = useDispatch(); 

  // Fetch modules from the server 
  const fetchModules = async () => { 
    try { 
      const modules = await client.findModulesForCourse(cid); 
      dispatch(setModules(modules)); 
    } catch (error) { 
      console.error("Error fetching modules:", error); 
    } 
  }; 
  
  useEffect(() => { 
    if (cid) { 
      fetchModules(); 
    } 
  }, [cid]); 

  // API handler for Add Module 
  const handleAddModule = async () => { 
    try { 
      const newModule = await client.createModuleForCourse(cid, { name: moduleName }); 
      dispatch(addModule(newModule)); 
      setModuleName(""); 
    } catch (error) { 
      console.error("Error creating module:", error); 
    } 
  }; 

  // API handler for Delete Module 
  const handleDeleteModule = async (moduleId: string) => { 
    try { 
      await client.deleteModule(moduleId); 
      dispatch(deleteModule(moduleId)); 
    } catch (error) { 
      console.error("Error deleting module:", error); 
    } 
  }; 

  // API handler for Update Module (called when editing finishes) 
  const handleUpdateModule = async (updatedModule: any) => { 
    try { 
      await client.updateModule(updatedModule); 
      dispatch(updateModule(updatedModule)); 
    } catch (error) { 
      console.error("Error updating module:", error); 
    } 
  }; 

  return ( 
    <div> 
      <ModulesControls 
        setModuleName={setModuleName} 
        moduleName={moduleName} 
        addModule={handleAddModule} 
      /> 
      <ListGroup id="wd-modules" className="rounded-0"> 
        {modules
          .map((module: any) => ( 
            <ListGroupItem 
              key={module._id} 
              className="wd-module p-0 mb-5 fs-5 border-gray" 
            > 
              <div className="wd-title p-3 ps-2 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3" /> 
                {!module.editing && module.name} 
                {module.editing && ( 
                  <FormControl 
                    className="l-0 w-50 d-inline-block" 
                    onChange={(e) => 
                      dispatch( 
                        updateModule({ ...module, name: e.target.value }) 
                      ) 
                    } 
                    onKeyDown={(e) => { 
                      if (e.key === "Enter") { 
                        handleUpdateModule({ ...module, editing: false }); 
                      } 
                    }} 
                    defaultValue={module.name} 
                  /> 
                )} 
                <ModuleControlButtons
                  moduleId={module._id} 
                  deleteModule={handleDeleteModule} 
                  editModule={(moduleId) => dispatch(editModule(moduleId))} 
                /> 
              </div> 
              {module.lessons && ( 
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any, index: number) => ( 
                    <ListGroupItem 
                      key={lesson._id || `lesson-${index}`} 
                      className="wd-lesson p-3 ps-1" 
                    > 
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons /> 
                    </ListGroupItem> 
                  ))} 
                </ListGroup> 
              )} 
            </ListGroupItem> 
          ))} 
      </ListGroup> 
    </div> 
  ); 
}
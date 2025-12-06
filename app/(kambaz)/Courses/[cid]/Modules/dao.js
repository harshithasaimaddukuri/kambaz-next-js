import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    // Filter modules based on the course ID
    return db.modules.filter((m) => m.course === courseId);
  }

  function createModule(courseId, module) {
    // Create new module with UUID and course association
    const newModule = { ...module, _id: uuidv4(), course: courseId, lessons: [] };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    // Delete module by ID
    db.modules = db.modules.filter((m) => m._id !== moduleId);
  }

  function updateModule(moduleId, moduleUpdates) {
    // Update module by ID
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = db.modules.find((m) => m._id === moduleId);
    if (module) {
        Object.assign(module, moduleUpdates);
    }
    return module;
  }

  return { 
    findModulesForCourse, 
    createModule, 
    deleteModule, 
    updateModule 
  };
}
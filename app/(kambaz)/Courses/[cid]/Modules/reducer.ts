import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

interface Lesson {
  _id: string;
  name: string;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: initialModules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<any>
    ) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: action.payload.name,
        course: action.payload.course,
        lessons: [],
      };
      state.modules.push(newModule);
    },
    deleteModule: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<any>
    ) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
    updateModule: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<any>
    ) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<any>
    ) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;

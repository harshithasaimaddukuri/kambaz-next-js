"use client";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <span className="float-end">
        <FaPlus className="me-3 fs-4" />
        <GreenCheckmark/>
      <FaEllipsisV />
    </span>
  );
}

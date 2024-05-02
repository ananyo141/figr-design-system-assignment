"use client";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import ColorsTab from "./ColorView";
import SpacingTab from "./SpaceView";
import { useEffect, useState } from "react";
import RadiusTab from "./RadiusView";
import ComponentTab from "./ComponentView";

import { getProjectById, updateProject } from "@/network/projectsApi";

// Define the animation: a continuous rotation
const spinTransition = {
  loop: Infinity, // Loop the animation forever
  ease: "linear", // Linear animation gives the constant spin effect
  duration: 1, // Time in seconds for one complete spin
};

const spinVariant = {
  animate: {
    rotate: 360, // Rotate the element 360 degrees
  },
};
export default function Project({ params }) {
  const id = params.slug;
  const [project, setProject] = useState([]);
  const [colors, setColors] = useState([]);
  const [enums, setEnums] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState(null);
  const [selectedRadiusSize, setSelectedRadiusSize] = useState(null);
  const [isAutosaving, setIsAutoSaving] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      setIsAutoSaving(true);
      try {
        const projectDataToUpdate = {
          colors,
          radius: selectedRadiusSize,
          spacing: { baseSize: selectedSpacingSize },
        };
        const { data } = await updateProject(id, projectDataToUpdate);
        setProject(data);
      } catch (err) {
        toast({
          title: "Something went wrong while autosaving.",
        });
        console.error(err);
      } finally {
        setIsAutoSaving(false);
      }
    };

    const interval = setInterval(() => {
      updateData();
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedRadiusSize, colors, selectedSpacingSize, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjectById(id);
        setProject(data.project);
        setColors(data.project.colors);
        setEnums(data.enums);
        setSelectedSpacingSize(data.project.spacing.baseSize);
        setSelectedRadiusSize(data.project.radius);
        setSelectedColor(data.project.colors[0]);
      } catch (err) {
        console.error(err);
        toast({
          title: "Something went wrong while fetching projects.",
          description: "Please try again.",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSaveProject = async () => {
    setIsAutoSaving(true);
    const projectDataToUpdate = {
      colors,
      radius: selectedRadiusSize,
      spacing: { baseSize: selectedSpacingSize },
    };
    try {
      const response = await updateProject(id, projectDataToUpdate);
      if (response.success === true) {
        setProject(response.data);
        toast({
          title: "Success!",
          description: "Project data saved successfully",
        });
      } else {
        toast({
          title: response.message,
          description: "Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong while saving project.",
      });
    } finally {
      setIsAutoSaving(false);
    }
  };

  return (
    <div>
      <div className="w-10/12 mx-auto mt-10">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-2xl font-bold">Current Project: {(project as any)?.name}</p>
          <div className="flex items-center gap-4">
            {isAutosaving ? (
              <div className="flex justify-center items-center">
                <motion.span
                  className="loader"
                  style={{
                    border: "4px solid #e9e9e9",
                    borderTop: "4px solid #3498db",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                  variants={spinVariant}
                  animate="animate"
                  transition={spinTransition}
                />
              </div>
            ) : null}
          </div>
        </div>
        <Tabs defaultValue="color">
          <TabsList className="flex space-x-1 bg-slate-200 rounded-lg p-1">
            <TabsTrigger
              value="color"
              className="flex-1 text-center py-2 rounded-lg font-medium text-sm cursor-pointer hover:bg-slate-300 focus:outline-none focus:bg-slate-400"
            >
              Color
            </TabsTrigger>
            <TabsTrigger
              value="spacing"
              className="flex-1 text-center py-2 rounded-lg font-medium text-sm cursor-pointer hover:bg-slate-300 focus:outline-none focus:bg-slate-400"
            >
              Spacing
            </TabsTrigger>
            <TabsTrigger
              value="radius"
              className="flex-1 text-center py-2 rounded-lg font-medium text-sm cursor-pointer hover:bg-slate-300 focus:outline-none focus:bg-slate-400"
            >
              Radius
            </TabsTrigger>
            <TabsTrigger
              value="component"
              className="flex-1 text-center py-2 rounded-lg font-medium text-sm cursor-pointer hover:bg-slate-300 focus:outline-none focus:bg-slate-400"
            >
              Component
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color" className="grid grid-cols-4 gap-4">
            <ColorsTab
              id={id}
              // project={project}
              // setProject={setProject}
              colors={colors}
              setColors={setColors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </TabsContent>
          <TabsContent value="spacing" className="grid grid-cols-4 gap-4">
            <SpacingTab
              enums={enums}
              selectedSpacingSize={selectedSpacingSize}
              setSelectedSpacingSize={setSelectedSpacingSize}
            />
          </TabsContent>
          <TabsContent value="radius" className="grid grid-cols-4 gap-4">
            <RadiusTab
              enums={enums}
              selectedRadiusSize={selectedRadiusSize}
              setSelectedRadiusSize={setSelectedRadiusSize}
            />
          </TabsContent>
          <TabsContent value="component" className="grid grid-cols-4 gap-4">
            <ComponentTab
              colors={colors}
              selectedSpacingSize={selectedSpacingSize}
              selectedRadiusSize={selectedRadiusSize}
            />
          </TabsContent>
        </Tabs>
        <Button
          className="bg-blue-600 ml-4 hover:bg-blue-700 text-white font-semibold p-4 rounded shadow"
          onClick={handleSaveProject}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

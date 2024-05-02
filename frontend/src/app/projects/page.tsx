"use client";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { getUserProjects, createProject } from "@/network/projectsApi";
import { useRouter } from "next/navigation";
import { CustomDialog } from "./CustomDialog";

const Home = () => {
  const [projects, setProjects] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const router = useRouter();

  const handleCreateProject = async () => {
    if (!projectName) {
      toast({
        title: "Project needs a name.",
        description: "Please try again.",
      });
      return;
    }

    try {
      const response = await createProject({
        name: projectName,
      });
      console.log(response);
      if (response.success === true) {
        router.push(`/projects/${response.data._id}`);
      } else {
        toast({
          title: response.message,
          description: JSON.stringify(response.data, null, 2),
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getUserProjects();
        console.log(projectsData);
        setProjects(projectsData.data);
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

  return (
    <div>
      <main className="container mx-auto py-8">
        <div className="mb-4">
          <CustomDialog
            projectName={projectName}
            setProjectName={setProjectName}
            handleCreateProject={handleCreateProject}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {projects &&
            projects.map((project) => (
              <Link href={`/projects/${project._id}`} key={project._id}>
                <Card
                  className="bg-white shadow-md p-10"
                  style={{
                    borderRadius:
                      project.radius.baseSize * project.radius.multiplier,
                  }}
                >
                  <CardHeader className="text-xl font-bold mb-6 p-0">
                    {project.name}
                  </CardHeader>
                  <CardDescription>
                    <div className="flex flex-wrap z-50">
                      {project.colors.map((color: any, index: number) => (
                        <div key={`project-color-${index}`} className="p-1">
                          <div
                            className="w-8 h-8 rounded-sm cursor-pointer hover:scale-125 transform transition duration-300 ease-in-out flex items-center justify-center relative"
                            style={{ backgroundColor: color.value }}
                          >
                            <span
                              className="opacity-0 hover:opacity-100 absolute text-xs text-white bg-black bg-opacity-75 rounded px-2 py-1 transition-opacity duration-300 ease-in-out"
                              // style={{ bottom: "calc(100% + 0.5rem)" }}
                            >
                              {color.label || color.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardDescription>
                </Card>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

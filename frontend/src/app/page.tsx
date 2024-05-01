"use client"

import { useState, useEffect } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Link } from "lucide-react";
import { ProjectDialog } from "@/components/ProjectDialog";

const Home = () => {
  const [projects, setProjects] = useState<any>([]);
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!projectName) {
      toast({
        title: "⛔ Project needs a name.",
        description: "Please try again.",
      });
      return;
    }

    try {
    } catch (err) {
      console.error(err);
      toast({
        title: "⛔ Something went wrong.",
        description: "Please try again.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const projectsData = await getUserProjects("projects");
        // setProjects(projectsData.data.data);
      } catch (err) {
        console.error(err);
        toast({
          title: "⛔ Something went wrong while fetching projects.",
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
          <ProjectDialog
            projectName={projectName}
            setProjectName={setProjectName}
            handleCreateProject={handleCreateProject}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {projects &&
            projects.map((project: any) => (
              <Link to={`/project/${project._id}`} key={project._id}>
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
                    {project.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-full h-4 w-4 mr-2"
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
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

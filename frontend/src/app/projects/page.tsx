"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { getUserProjects, createProject } from "@/network/projectsApi";
import { useRouter } from "next/navigation";

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
          title:response.message,
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
        console.log(projectsData)
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
          <ProjectDialog
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

function ProjectDialog({ projectName, setProjectName, handleCreateProject }) {
  return (
    <Dialog>
      <div className="w-full flex justify-end">
        <DialogTrigger asChild>
          <Button>Create Project</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-6 items-center gap-4 px-2">
            <Label htmlFor="name" className="text-right col-span-2">
              Project Name*
            </Label>
            <Input
              value={projectName}
              id="name"
              className="col-span-4"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateProject}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Home;

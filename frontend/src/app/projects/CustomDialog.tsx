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

export function CustomDialog({ projectName, setProjectName, handleCreateProject }) {
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


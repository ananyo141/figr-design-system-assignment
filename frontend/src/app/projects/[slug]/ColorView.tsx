import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateHexColorCode } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateProject } from "@/network/projectsApi";
import { toast } from "@/components/ui/use-toast";

interface Color {
  _id: string;
  label: string;
  value: string;
}

const ColorsTab = ({
  id,
  colors,
  setColors,
  selectedColor,
  setSelectedColor,
}) => {
  const handleColorValueChange = ({ id, hexValue }) => {
    setColors((prevState: Color[]) => {
      let updatedColor: Color[] = [];
      prevState.forEach(({ _id, value, label }) => {
        let color: Color;
        if (_id === id) {
          color = { _id, label, value: hexValue };
        } else {
          color = { _id, value, label };
        }
        updatedColor.push(color);
      });
      return [...updatedColor];
    });
    setSelectedColor({ ...selectedColor, value: hexValue });
  };

  const handleColorVariableNameChange = ({ id, varibleName }) => {
    setColors((prevState: Color[]) => {
      let updatedColor: Color[] = [];
      prevState.forEach(({ _id, value, label }) => {
        let color: Color;
        if (_id === id) {
          color = { _id, label: varibleName, value };
        } else {
          color = { _id, value, label };
        }
        updatedColor.push(color);
      });
      return [...updatedColor];
    });
    setSelectedColor({ ...selectedColor, label: varibleName });
  };

  const handleAddColor = async () => {
    setColors((prevState: Color[]) => {
      let colors: Partial<Color>[] = prevState;
      colors.push({
        label: `Color ${colors.length + 1}`,
        value: generateHexColorCode(),
      });
      return colors;
    });
    setSelectedColor(colors[colors.length - 1]);

    try {
      const response = await updateProject(id, {
        colors: colors,
      });
      console.log(response);
      if (response.success === true) {
        setColors(response.data.colors);
        toast({
          title: "Color added",
          description: response.message,
        });
      } else {
        console.error(response.message);
        toast({
          title: "Failed to add color",
          description: response.message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex col-span-4 gap-4 p-4">
      <Card className="w-1/2 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-100 p-2 rounded-t">
          <CardTitle className="font-semibold">Colors</CardTitle>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded p-1"
            onClick={handleAddColor}
          >
            Add Color
          </Button>
        </CardHeader>
        <ScrollArea className="h-[400px]">
          <CardContent className="space-y-1 p-2">
            <Accordion type="single" collapsible>
              {colors &&
                colors.map((color: Color) => {
                  return (
                    <AccordionItem key={color._id} value={color._id}>
                      <AccordionTrigger className="flex justify-between p-2 rounded">
                        <span
                          // key={"project-" + index}
                          className="inline rounded-full h-4 w-4 mr-2"
                          style={{ backgroundColor: color.value }}
                        />
                        {color.label}
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-100 p-2">
                        <div className="mb-2">
                          <Label htmlFor={`variable-name-${color._id}`}>
                            Variable Name
                          </Label>
                          <Input
                            id={`variable-name-${color._id}`}
                            type="text"
                            value={color.label}
                            onChange={(e) => {
                              handleColorVariableNameChange({
                                id: color._id,
                                varibleName: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="mb-2">
                          <Label htmlFor={`hex-code-${color._id}`}>
                            Hex Code
                          </Label>
                          <Input
                            id={`hex-code-${color._id}`}
                            type="text"
                            value={color.value}
                            onChange={(e) => {
                              handleColorValueChange({
                                id: color._id,
                                hexValue: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </CardContent>
        </ScrollArea>
      </Card>
      <Card className="w-full shadow-xl h-[500px]">
        <CardHeader className="bg-gray-100 p-2 rounded-t">
          <CardTitle className="font-semibold">Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <div className="w-3/4 h-3/4 flex items-center justify-center rounded-sm bg-gray-300 p-4">
            <div
              className="w-full h-full rounded-sm text-center"
              style={{ backgroundColor: selectedColor?.value }}
            >
              <div className="p-2 m-2 bg-white rounded-sm shadow-md">
                <span>{selectedColor?.label}</span>
                <div className="text-sm">{selectedColor?.value}</div>
              </div>
            </div>
          </div>
          <div className="flex overflow-y-auto flex-col h-full mb-16">
            {colors &&
              colors.map((color: Color) => {
                if (color._id === selectedColor._id) return null;
                return (
                  <div
                    key={color._id}
                    className="flex items-center justify-center rounded-sm p-4"
                  >
                    <div
                      className="w-full h-full rounded-sm text-center"
                      style={{ backgroundColor: color.value }}
                    >
                      <div className="p-2 m-2 bg-white rounded-sm shadow-md">
                        <span>{color.label}</span>
                        <div className="text-sm">{color.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorsTab;

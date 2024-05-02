import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateComponentStyles } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditComponentStyle from "./ComponentStyleView";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const buttonSizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-3 text-xl",
  "2xl": "px-10 py-4 text-2xl",
};

const ComponentTab = ({ colors, selectedSpacingSize, selectedRadiusSize }) => {
  const [selectedComponent, setSelectedComponent] = useState("Button");
  const [componentsStyles, setComponentsStyles] = useState(null);

  useEffect(() => {
    if (colors && colors.length > 0) {
      const componentStyles = generateComponentStyles(
        colors,
        selectedSpacingSize,
        selectedRadiusSize,
      );
      setComponentsStyles(componentStyles);
    }
  }, [colors, selectedSpacingSize, selectedRadiusSize]);

  return (
    <>
      <Card className="col-span-1">
        <CardTitle className="p-4">Components</CardTitle>
        <CardContent className="py-4 h-[400px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Button" ? "text-blue-700" : ""
            }`}
            onClick={() => setSelectedComponent("Button")}
          >
            Button
          </motion.div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Radio" ? "text-blue-700" : ""
            }`}
            onClick={() => setSelectedComponent("Radio")}
          >
            Radio
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Select" ? "text-blue-700" : ""
            }`}
            onClick={() => setSelectedComponent("Select")}
          >
            Select
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Checkbox" ? "text-blue-700" : ""
            }`}
            onClick={() => setSelectedComponent("Checkbox")}
          >
            Checkbox
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Input-Text" ? "text-blue-700" : ""
            }`}
            onClick={() => setSelectedComponent("Input-Text")}
          >
            Input
          </div>
          <hr />
        </CardContent>
      </Card>
      <Card className="col-span-3 p-4">
        <ScrollArea className="h-[400px]">
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: selectedComponent === "Button" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center"
                  >
                    <div>
                      {Object.entries(buttonSizes).map(
                        ([size, sizeClass], index) => (
                          <Button
                            key={size}
                            style={component}
                            className={`active:scale-90 duration-100 transition col-span-1 ${sizeClass}`}
                          >
                            {`${component.label} Button ${size.toUpperCase()}`}
                          </Button>
                        ),
                      )}
                    </div>
                    <div className="col-span-2 px-4">
                      <EditComponentStyle
                        type="button"
                        componentsStyles={componentsStyles}
                        componentStyle={component}
                        setComponentsStyles={setComponentsStyles}
                      />
                    </div>
                  </div>
                );
              })}
          </motion.div>
          <div
            style={{
              display: selectedComponent === "Input-Text" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center"
                  >
                    <Input style={component} defaultValue={component.label} />
                    <div className="col-span-2 px-4">
                      <EditComponentStyle
                        type="input"
                        componentsStyles={componentsStyles}
                        componentStyle={component}
                        setComponentsStyles={setComponentsStyles}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display: selectedComponent === "Radio" ? "block" : "none",
            }}
          >
            <div className="flex mt-32 w-full items-center justify-center">
              <RadioGroup defaultValue="comfortable">
                {/* <div className="flex items-center space-x-2"> */}
                {/*   <RadioGroupItem value="default" id="r1" /> */}
                {/*   <Label htmlFor="r1">Default</Label> */}
                {/* </div> */}
                {/* <div className="flex items-center space-x-2"> */}
                {/*   <RadioGroupItem value="comfortable" id="r2" /> */}
                {/*   <Label htmlFor="r2">Comfortable</Label> */}
                {/* </div> */}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Radio</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div
            style={{
              display: selectedComponent === "Checkbox" ? "block" : "none",
            }}
          >
            <div className="flex mt-32 w-full items-center justify-center">
              <div>
                <div className="flex items-center space-x-2 mb-10">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Checkbox
                  </label>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Checkbox
                    </label>
                    <p className="text-sm text-muted-foreground">
                      This is subtitle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: selectedComponent === "Select" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center pl-4"
                  >
                    <Select style={component}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent style={component}>
                        <SelectItem
                          value="light"
                          style={{ color: component.color }}
                        >
                          Light
                        </SelectItem>
                        <SelectItem
                          value="dark"
                          style={{ color: component.color }}
                        >
                          Dark
                        </SelectItem>
                        <SelectItem
                          value="system"
                          style={{ color: component.color }}
                        >
                          System
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="col-span-2 px-4">
                      <EditComponentStyle
                        componentsStyles={componentsStyles}
                        componentStyle={component}
                        setComponentsStyles={setComponentsStyles}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default ComponentTab;

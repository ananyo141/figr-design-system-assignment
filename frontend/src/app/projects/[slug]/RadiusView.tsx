import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VariableTable from "./VariableView";
import { generateRadiusVariables } from "@/lib/utils";

// Animation variants
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const RadiusTab = ({ enums, selectedRadiusSize, setSelectedRadiusSize }) => {
  const sizeVariables = generateRadiusVariables(selectedRadiusSize);

  const handleRadiusBaseSizeChange = (value) => {
    setSelectedRadiusSize({ ...selectedRadiusSize, baseSize: value });
  };

  const handleRadiusMultiplierSizeChange = (value) => {
    setSelectedRadiusSize({ ...selectedRadiusSize, multiplier: value });
  };

  return (
    <>
 <motion.div
      className="col-span-1"
      initial="hidden"
      animate="visible"
      variants={cardVariant}
      transition={{ duration: 0.5 }}
    >
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-start p-4">
          <div className="mb-4">
            <Label htmlFor="baseSizeSelect">Select base size</Label>
            <Select
              onValueChange={handleRadiusBaseSizeChange}
              // id="baseSizeSelect"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedRadiusSize.baseSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                {enums && enums.radiusBaseSize.map((size, idx) => (
                  <SelectItem value={size} key={idx}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="multiplierSizeSelect">Select multiplier size</Label>
            <Select
              onValueChange={handleRadiusMultiplierSizeChange}
              // id="multiplierSizeSelect"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedRadiusSize.multiplier.toString()} />
              </SelectTrigger>
              <SelectContent>
                {enums && enums.radiusMultiplier.map((size, idx) => (
                  <SelectItem value={size} key={idx}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      </motion.div>
  <motion.div
      className="col-span-3"
      initial="hidden"
      animate="visible"
      variants={cardVariant}
      transition={{ duration: 0.5, delay: 0.2 }} // Adding a staggered delay for the second card
    >
      <Card className="col-span-3">
        <VariableTable sizeVariables={sizeVariables} />
      </Card>
      </motion.div>
    </>
  );
};

export default RadiusTab;

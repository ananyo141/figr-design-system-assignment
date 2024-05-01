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

const RadiusTab = ({ enums, selectedRadiusSize, setSelectedRadiusSize }) => {
  const sizeVariables = generateRadiusVariables(selectedRadiusSize);

  const handleRaidusBaseSizeChange = (value) => {
    setSelectedRadiusSize({ ...selectedRadiusSize, baseSize: value });
  };

  const handleRaidusMultiplierSizeChange = (value) => {
    setSelectedRadiusSize({ ...selectedRadiusSize, multiplier: value });
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 h-[400px]">
          <div className="mb-6">
            <Label htmlFor="name">Select base size</Label>
            <Select
              onValueChange={(value) => {
                handleRaidusBaseSizeChange(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedRadiusSize.baseSize} />
              </SelectTrigger>
              <SelectContent>
                {enums &&
                  enums?.radiusBaseSize.map((size, idx) => {
                    return (
                      <SelectItem value={size} key={idx}>
                        {size}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <Label htmlFor="name">Select multiplier size</Label>
          <Select
            onValueChange={(value) => {
              handleRaidusMultiplierSizeChange(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectedRadiusSize.multiplier} />
            </SelectTrigger>
            <SelectContent>
              {enums &&
                enums?.radiusMultiplier.map((size, idx) => {
                  return (
                    <SelectItem value={size} key={idx}>
                      {size}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <VariableTable sizeVariables={sizeVariables} />
      </Card>
    </>
  );
};

export default RadiusTab;

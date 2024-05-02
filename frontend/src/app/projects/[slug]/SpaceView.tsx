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

function generateSpacingVariables(base) {
  const scale = {
    xs: 0.5, // xs is half the base size
    s: 1, // s is the base size
    md: 1.5, // md is 1.5 times the base size
    lg: 2, // lg is twice the base size
    xl: 3, // xl is three times the base size
  };

  let sizes = [] as any;

  for (const key in scale) {
    sizes.push({
      name: key,
      size: Math.round(base * scale[key]),
    });
  }

  return sizes;
}

const SpacingTab = ({ enums, selectedSpacingSize, setSelectedSpacingSize }) => {
  const sizeVariables = generateSpacingVariables(selectedSpacingSize);

  const handleBaseSizeChange = (value) => {
    setSelectedSpacingSize(value);
  };

  return (
    <>
      <Card className="col-span-1 shadow-lg">
        <CardHeader className="p-2 rounded-t">
          <CardTitle className="text">Spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 h-[400px] p-4">
          <Label htmlFor="name" className="text-lg">Select base size</Label>
          <Select
            onValueChange={(value) => {
              handleBaseSizeChange(value);
            }}
          >
            <SelectTrigger className="w-[180px] bg-gray-100 p-2 rounded">
              <SelectValue placeholder={selectedSpacingSize} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded shadow-lg">
              {enums &&
                enums?.spacingBaseSize.map((size, idx) => {
                  return (
                    <SelectItem value={size} key={idx} className="p-2 hover:bg-gray-100">
                      {size}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="col-span-3 shadow-lg">
        <VariableTable sizeVariables={sizeVariables} />
      </Card>
    </>
  );
};

export default SpacingTab;

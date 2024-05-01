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
// import { generateSpacingVariables } from "@/lib/utils";

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
function generateRadiusVariables({ baseSize, multiplier }) {
  let sizes;
  if (multiplier === 1) {
    sizes = {
      xs: 1,
      s: 1,
      md: 1,
      lg: 1,
      xl: 1,
    };
  } else {
    sizes = {
      xs: multiplier * 0.5,
      s: multiplier,
      md: multiplier * 1.5,
      lg: multiplier * 2,
      xl: multiplier * 3,
    };
  }

  let sizeVariables = [] as any;

  for (const key in sizes) {
    sizeVariables.push({
      name: key,
      size: Math.round(baseSize * sizes[key]),
    });
  }

  return sizeVariables;
}
const SpacingTab = ({ enums, selectedSpacingSize, setSelectedSpacingSize }) => {
  const sizeVariables = generateSpacingVariables(selectedSpacingSize);

  const handleBaseSizeChange = (value) => {
    setSelectedSpacingSize(value);
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 h-[400px]">
          <Label htmlFor="name">Select base size</Label>
          <Select
            onValueChange={(value) => {
              handleBaseSizeChange(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectedSpacingSize} />
            </SelectTrigger>
            <SelectContent>
              {enums &&
                enums?.spacingBaseSize.map((size, idx) => {
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

export default SpacingTab;

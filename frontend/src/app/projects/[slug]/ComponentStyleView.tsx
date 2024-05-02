import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditComponentStyle = ({
  componentStyle,
  componentsStyles,
  setComponentsStyles,
}) => {
  const updateStyleProperty = (property, value) => {
    const updatedStyles = componentsStyles.map((style) => {
      if (style.label === componentStyle.label) {
        return { ...style, [property]: value };
      }
      return style;
    });
    setComponentsStyles(updatedStyles);
  };

  return (
    <>
      {componentStyle && (
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="space-y-4">
            <div>
              <Label>Bg Color</Label>
              <Input
                type="text"
                placeholder="Bg Color"
                defaultValue={componentStyle.backgroundColor}
                className="w-52"
                onChange={(e) => updateStyleProperty('backgroundColor', e.target.value)}
              />
            </div>
            <div>
              <Label>Border Color</Label>
              <Input
                type="text"
                placeholder="Border Color"
                defaultValue={componentStyle.borderColor}
                onChange={(e) => updateStyleProperty('borderColor', e.target.value)}
              />
            </div>
            <div>
              <Label>Padding-X</Label>
              <Input
                type="text"
                placeholder="Padding-X"
                defaultValue={componentStyle.paddingLeft} // Assuming paddingLeft is available
                onChange={(e) => updateStyleProperty('paddingLeft', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Text Color</Label>
              <Input
                type="text"
                placeholder="Text Color"
                defaultValue={componentStyle.color}
                onChange={(e) => updateStyleProperty('color', e.target.value)}
              />
            </div>
            <div>
              <Label>Border Radius</Label>
              <Input
                type="text"
                placeholder="Border Radius"
                defaultValue={componentStyle.borderRadius}
                onChange={(e) => updateStyleProperty('borderRadius', e.target.value)}
              />
            </div>
            <div>
              <Label>Padding-Y</Label>
              <Input
                type="text"
                placeholder="Padding-Y"
                defaultValue={componentStyle.paddingTop} // Assuming paddingTop is available
                onChange={(e) => updateStyleProperty('paddingTop', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditComponentStyle;

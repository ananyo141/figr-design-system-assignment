import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  if (user == undefined) {
    return {};
  }

  return JSON.parse(user);
}

export function generateHexColorCode() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];

  return color;
}

export function generateSpacingVariables(base) {
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

export function generateRadiusVariables({ baseSize, multiplier }) {
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

export function generateComponentStyles(colors, spacing, radius) {
  const calculatedRadius = radius.baseSize * radius.multiplier;

  const buttonStyles = colors.map((color) => ({
    backgroundColor: color.value,
    color: "#ffffff",
    margin: `${spacing}px`,
    padding: `${spacing}px`,
    borderRadius: `${calculatedRadius}px`,
    label: color.label + " - s",
  }));

  return buttonStyles;
}

export enum ButtonType {
  ICON_ONLY,
  DEFAULT  
};

export type ButtonOptions = {
  margin?: String,
  padding?: String,
  color?: String,
  border?: String,
  background?: String,
  alignSelf?: String;
};

export enum ButtonDefaults{
  COLOR = "#282a2b",
  MARGIN = ".2rem",
  PADDING = ".2rem",
  BORDER = "none",
  BACKGROUND = "transparent",
  ALING_SELF = "unset"
};


export enum TooltipType {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT  
};

export type TooltipOptions = {
  bgColor?: string;
  fontColor?: string;
  fontFamily?: string;
  arrowBorderColor?: string;
  arrowBorderShadowColor?: string;
  border?: string;
  left?: any;
  right?: string;
  top?: string;
  minWidth?: string;
  textAlign?: string;
  borderRadius?: string;
  padding?: string;
  zIndex?: number;
  animationSpeed?: string;
  animationEasing?: string;
};

export enum ToastType {
  ACTION_REMOVE = 1,
  ACTION_ADD = 2,
};

export type ToasOptions = {
  title?: string,
  msg?: string,
  type: ToastType
};


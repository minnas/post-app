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

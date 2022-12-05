export enum themes {
  dark = 'dark',
  white = 'white',
}

export const isThemeType = (str: string): str is themes => {
  return str === themes.dark || str === themes.white
}

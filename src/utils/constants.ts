export const radius = 100;
export const camera_init_pos = [0, 0, radius * 3] as const;
export const one_second = 1000;
export const intervalTimer = one_second;
export const SERVER_URL = import.meta.env.DEV
  ? import.meta.env.BACKEND_URL_DEV
  : import.meta.env.BACKEND_URL;

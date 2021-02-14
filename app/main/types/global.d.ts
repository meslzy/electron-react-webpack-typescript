export {}

declare global {
  namespace NodeJS {
    interface Global {
      dev: boolean;
    }
  }
}

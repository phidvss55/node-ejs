declare namespace jest {
  interface Describe{
      stress (cc: number, name: number | string | Function , fn: Function): void;
  }
}
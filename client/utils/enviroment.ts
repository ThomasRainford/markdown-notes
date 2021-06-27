export const enviroment = (): string => {
   const env = process.env.NODE_ENV;
   if (env === "development") {
      return "dev";
   } else if (env === "production") {
      return "prod"
   } else {
      return "test"
   }
}
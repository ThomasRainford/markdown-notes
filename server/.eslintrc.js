module.exports = {
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module"
   },
   extends: [
      "plugin:@typescript-eslint/recommended"
   ],
   rules: {
      // Your eslint rules go here. Can be used to overwrite rules specified in the extends property.

   }
};
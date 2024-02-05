/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // path aliases
    "^@src/(.*)\\.(js|ts|tsx)?$": "<rootDir>/src/$1",

    // this is specific for this application only because
    // this is build with NODENEXT (see tsconfig) abd one
    // wierd rule for that is to have a ".js" extension to
    // the imports even for a ts project, but jest do not
    // understand this so the below regex is just to map
    // the path by removing/ignoring their extensions,
    // this basically capture any import that starts with
    // "." and ignores its extension. The reason to pick
    // only those what starts with "." is to leave the other
    // things like import express from "express" alone
    "^\\.(.*)\\.js$": ".$1",
  },
}

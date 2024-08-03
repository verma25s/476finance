// declare a module for png files which allows us to import png images in typescript files
  declare module '*.png' {
    const value: string;
    export default value;
  }
// declare a module for jpg files which allows us to import jpg images in typescript files
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
// declare a module for jpeg files which allows us to import jpeg images in typescript files
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
// declare a module for svg files which allows us to import svg images in typescript files
  declare module '*.svg' {
    const value: string;
    export default value;
  }
  
  declare var require: {
    context: (path: string, deep?: boolean, filter?: RegExp) => {
      // keys method will returns an array of all matching file paths as strings
      keys: () => string[];
      // function allows us importing a module by its id 
      // and returns with a type T
      <T>(id: string): T;
    };
  };
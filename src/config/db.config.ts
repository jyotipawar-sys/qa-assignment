export const config = {
    HOST: "localhost",
    USER: "manojjadhav",
    PASSWORD: "123456",
    DB: "qpassignment",
    secretKey: "qwert12345",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  export const dialect = "postgres";
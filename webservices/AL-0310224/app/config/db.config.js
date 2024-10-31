module.exports = {
    HOST: "localhost",
    USER: "aluno",
    PASSWORD: "aluno",
    DB: "localhost 2",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, 
      idle: 10000
    }
  }
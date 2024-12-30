//importando o node module do mysql
import mysql from 'mysql'

const conexao =  mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bdcopa'
})

conexao.connect()

//para poder utiizar em outros arquivos
export default conexao
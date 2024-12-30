import express from 'express' //importando o módulo express para o projeto
import conexao from '../infra/conexao.js'

const app = express() //criando uma instância

app.use(express.json()) //indica para o express ler body com json (adicionar qd formos testar o post via insomnia)

app.get('/selecoes', (req, res) => {
  const sql = "SELECT * FROM SELECOES;"
  conexao.query(sql, (error, result) => {
    if (error) {  
      console.log(error)      
      res.status(404).json({ 'Erro' : error })
    } else {
      res.status(200).json(result)
    }
  })
})

//método/verbo get - rota para buscar selecao por id - na url informar /selecoes/1 por ex
app.get('/selecoes/:id', (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM selecoes WHERE id = ?;"
  conexao.query(sql, id, (error, result) => {
    const linha = result[0] //se quiser pegar diretamente o unico elemento retornado
    if (error) {  
      console.log(error)      
      res.status(404).json({ 'Erro' : error })
    } else {
      //res.status(200).json(result)
      res.status(200).json(linha)
    }
  })
})

//método/verbo post - dados passado no body da requisição (no insominia)
app.post('/selecoes', (req, res) => {
  const selecao = req.body
  const sql = "INSERT INTO selecoes SET ?;" 
  conexao.query(sql, selecao, (error, resultado) => {
    if(error) {
      res.status(400).json({ 'erro': error }) //400 bad request - requisicao nao atendida
    } else {
      res.status(201).json(resultado) //201 - sucesso
    }
  })
})

//método/verbo put  
//troca a seleção e o grupo, pelos dados da nova seleção enviados no corpo da req. Poderia enviar o id tb, mas cuidado pq é chave e autoinc
app.put('/selecoes/:id', (req, res) => {
  const id = req.params.id
  const selecao = req.body
  const sql = "UPDATE selecoes SET ? WHERE id = ?;" 
  conexao.query(sql, [selecao, id], (error, resultado) => { //[selecao, id] -> um parâmetro p/ cada ?
    if(error) {
      res.status(400).json({ 'erro': error }) //400 bad request - requisicao nao atendida
    } else {
      res.status(200).json(resultado) //200 - sucesso
    }
  })
})

//método/verbo delete
app.delete('/selecoes/:id', (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM selecoes WHERE id = ?;"
  conexao.query(sql, id, (error, result) => {    
    if (error) {        
      res.status(404).json({ 'Erro' : error }) //400 não localizado
    } else {
      //res.status(200).json(result)
      res.status(200).json(result)
    }
  })
}) 

export default app
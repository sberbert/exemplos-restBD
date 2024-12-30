import app from './src/app.js' //para termos acesso as rotas

const PORT = 3000 //definir a porta

//escutar a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})     
<?php
    include('conexao.php');
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $nome = $_POST['nome'];
        $descricao = $_POST['descricao'];
        $imagem = $_POST['imagem'];
        $idade = $_POST['idade'];
        $sql = "INSERT INTO games_cadastrados (nome, descricao, imagem, faixa_etaria) VALUES ('$nome', '$descricao', '$imagem', '$idade');";
        $verificacao = "SELECT * FROM games_cadastrados where nome = $nome";
        if(!query($verificacao) && $descricao != "" && $imagem != "" && $idade != ""){
            semQuery($sql);
        }
    }
    header("Access-Control-Allow-Origin: *");
?>
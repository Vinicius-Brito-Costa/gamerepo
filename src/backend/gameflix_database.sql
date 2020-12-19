CREATE DATABASE gameflix
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

USE gameflix;

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT NOT NULL,
    categoria VARCHAR(20),
    PRIMARY KEY(id_categoria)
);

INSERT INTO categorias (categoria) VALUES ('fps'), ('rpg'), ('luta'), ('terror'), ('ação'), ('2d'),('luta'), ("beat'em up"), ('futurista'), ('distopia'), ('jrpg'), ('tps'), ('isométrico');

CREATE TABLE games_categorizados (
    id_game INT NOT NULL,
    id_categoria int NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(categoria)
);

CREATE TABLE games_cadastrados (
    id_game INT AUTO_INCREMENT NOT NULL,
    nome VARCHAR(35) NOT NULL,
    descricao VARCHAR(325) NOT NULL,
    imagem VARCHAR(50) NOT NULL,
    faixa_etaria INT NOT NULL,
    PRIMARY KEY (id_game),
    FOREIGN KEY(id_game) REFERENCES games_categorizados(id_game)
);

INSERT INTO games_cadastrados (nome, descricao, imagem, faixa_etaria) VALUES 
('Nier: Automata', 'Humanity has been driven from the Earth by mechanical beings from another world. In a final effort to take back the planet, the human resistance sends a force of android soldiers to destroy the invaders. Now, a war between machines and androids rages on... A war that could soon unveil a long-forgotten truth of the world.', 'nier.jpg', '18'), 
('Transistor', 'O Transistor integra de forma perfeita uma organização estratégica cuidadosa numa experiência de ação de jogo rápido, combinando uma jogabilidade sensível com uma narração atmosférica rica. No decorrer da aventura, irás desvendar os mistérios de Transistor enquanto segues os passos dos seus anteriores donos.', 'transistor.jpg', '14'), 
('Resident Evil 3 Remake', 'Jill Valentine is one of the last remaining people in Raccoon City to witness the atrocities Umbrella performed. To stop her, Umbrella unleashes their ultimate secret weapon; Nemesis!', 're3r.jpg', '16'), 
('Castlevania Symphony of The Night', ' Castlevania rises again five years later, and while there are no Belmonts to storm the castle, Alucard, the son of Dracula, awakens from his self-induced sleep, and decides to investigate what transpired during his slumber.', 'castlevania.jpg', '14'), 
('Sekiro', "In Sekiro™: Shadows Die Twice you are the 'one-armed wolf', a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan.", 'sekiro.jpg', '18'), 
('Tekken 7', 'Love, Revenge, Pride. Everyone has a reason to fight. Values are what define us and make us human, regardless of our strengths and weaknesses. There are no wrong motivations, just the path we choose to take.', 'tekken7.jpg', '14'), 
('Doom Eternal', 'Os exércitos do Inferno invadiram a Terra. Torne-se o Slayer em uma campanha épica para um jogador e derrote demônios entre dimensões para impedir a derradeira destruição da humanidade. A única coisa que eles temem... é você.', 'doom.jpg', '18'),
('Cyberpunk 2077', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.', 'cyberpunk_1_4K.jpg', '18'),
('Streets of Rage', 'Looting, random violence and destruction are rampant. Nobody is safe. Despite repeated refusals by their superiors, three young police officers were determined to tackle the problem head on. Eventually they created a special attack unit the only way they could – they quit the force.', 'sor.jpg', '0');

CREATE TABLE lista_de_jogos(
    id_usuario INT NOT NULL,
    id_jogo INT NOT NULL,
    FOREIGN KEY (id_jogo) REFERENCES games_cadastrados(id_game)
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT NOT NULL,
    nome VARCHAR(12) NOT NULL,
    avatar VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES lista_de_jogos(id_usuario)
);

CREATE TABLE usuarios (
    id_conta INT NOT NULL,
    usuario INT,
    FOREIGN KEY(usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE cadastro (
    id_conta INT AUTO_INCREMENT NOT NULL,
    nome_login VARCHAR(12) NOT NULL,
    senha VARCHAR(18) NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_conta),
    FOREIGN KEY(id_conta) REFERENCES usuarios(id_conta)
);
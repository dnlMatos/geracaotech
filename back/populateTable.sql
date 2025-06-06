USE bd_geracaotech;

-- Usuários
INSERT INTO Users (firstname, surname, email, password, created_at, updated_at) VALUES
('João', 'Silva', 'joao1@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Maria', 'Oliveira', 'maria2@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Carlos', 'Santos', 'carlos3@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Ana', 'Souza', 'ana4@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Pedro', 'Lima', 'pedro5@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Julia', 'Costa', 'julia6@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Lucas', 'Ferreira', 'lucas7@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Fernanda', 'Almeida', 'fernanda8@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Rafael', 'Gomes', 'rafael9@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Patricia', 'Martins', 'patricia10@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Bruno', 'Barros', 'bruno11@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Camila', 'Ribeiro', 'camila12@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Felipe', 'Moura', 'felipe13@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Larissa', 'Pereira', 'larissa14@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Gabriel', 'Rodrigues', 'gabriel15@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Aline', 'Carvalho', 'aline16@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Thiago', 'Teixeira', 'thiago17@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Beatriz', 'Rocha', 'beatriz18@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Vinicius', 'Mendes', 'vinicius19@email.com', '<hash_bcrypt>', NOW(), NOW()),
('Paula', 'Vieira', 'paula20@email.com', '<hash_bcrypt>', NOW(), NOW());

-- Categorias
INSERT INTO Categories (name, slug, use_in_menu, created_at, updated_at) VALUES
('Eletrônicos', 'eletronicos', 1, NOW(), NOW()),
('Roupas', 'roupas', 0, NOW(), NOW()),
('Livros', 'livros', 1, NOW(), NOW()),
('Esportes', 'esportes', 0, NOW(), NOW()),
('Beleza', 'beleza', 1, NOW(), NOW()),
('Brinquedos', 'brinquedos', 0, NOW(), NOW()),
('Móveis', 'moveis', 1, NOW(), NOW()),
('Automotivo', 'automotivo', 0, NOW(), NOW()),
('Informática', 'informatica', 1, NOW(), NOW()),
('Games', 'games', 0, NOW(), NOW()),
('Petshop', 'petshop', 1, NOW(), NOW()),
('Joias', 'joias', 0, NOW(), NOW()),
('Ferramentas', 'ferramentas', 1, NOW(), NOW()),
('Alimentos', 'alimentos', 0, NOW(), NOW()),
('Bebidas', 'bebidas', 1, NOW(), NOW()),
('Calçados', 'calcados', 0, NOW(), NOW()),
('Viagem', 'viagem', 1, NOW(), NOW()),
('Saúde', 'saude', 0, NOW(), NOW()),
('Casa', 'casa', 1, NOW(), NOW()),
('Música', 'musica', 0, NOW(), NOW());

-- Produtos
INSERT INTO Products (enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, created_at, updated_at) VALUES
(1, 'Smartphone', 'smartphone', 1, 50, 'Celular de última geração', 2000.00, 1800.00, NOW(), NOW()),
(1, 'Camiseta', 'camiseta', 0, 100, 'Camiseta 100% algodão', 50.00, 40.00, NOW(), NOW()),
(1, 'Notebook', 'notebook', 1, 30, 'Notebook rápido', 3500.00, 3200.00, NOW(), NOW()),
(1, 'Tênis', 'tenis', 0, 80, 'Tênis esportivo', 200.00, 150.00, NOW(), NOW()),
(1, 'Livro', 'livro', 1, 200, 'Livro de aventura', 40.00, 30.00, NOW(), NOW()),
(1, 'Bicicleta', 'bicicleta', 0, 10, 'Bicicleta de alumínio', 1200.00, 1100.00, NOW(), NOW()),
(1, 'Perfume', 'perfume', 1, 60, 'Perfume importado', 300.00, 250.00, NOW(), NOW()),
(1, 'Boneca', 'boneca', 0, 90, 'Boneca de pano', 80.00, 60.00, NOW(), NOW()),
(1, 'Cadeira', 'cadeira', 1, 40, 'Cadeira ergonômica', 400.00, 350.00, NOW(), NOW()),
(1, 'Volante', 'volante', 0, 25, 'Volante esportivo', 500.00, 450.00, NOW(), NOW()),
(1, 'Mouse', 'mouse', 1, 70, 'Mouse gamer', 150.00, 120.00, NOW(), NOW()),
(1, 'Console', 'console', 0, 15, 'Console de videogame', 2500.00, 2300.00, NOW(), NOW()),
(1, 'Ração', 'racao', 1, 100, 'Ração para cães', 90.00, 80.00, NOW(), NOW()),
(1, 'Anel', 'anel', 0, 20, 'Anel de ouro', 800.00, 700.00, NOW(), NOW()),
(1, 'Martelo', 'martelo', 1, 60, 'Martelo de aço', 60.00, 50.00, NOW(), NOW()),
(1, 'Chocolate', 'chocolate', 0, 200, 'Chocolate ao leite', 10.00, 8.00, NOW(), NOW()),
(1, 'Vinho', 'vinho', 1, 30, 'Vinho tinto', 100.00, 90.00, NOW(), NOW()),
(1, 'Bota', 'bota', 0, 50, 'Bota de couro', 250.00, 200.00, NOW(), NOW()),
(1, 'Mala', 'mala', 1, 20, 'Mala de viagem', 300.00, 250.00, NOW(), NOW()),
(1, 'Violão', 'violao', 0, 10, 'Violão acústico', 600.00, 550.00, NOW(), NOW());

-- Imagens de Produto
INSERT INTO Product_images (product_id, enabled, path) VALUES
(1, 1, 'images/smartphone1.jpg'),
(2, 1, 'images/camiseta1.jpg'),
(3, 1, 'images/notebook1.jpg'),
(4, 1, 'images/tenis1.jpg'),
(5, 1, 'images/livro1.jpg'),
(6, 1, 'images/bicicleta1.jpg'),
(7, 1, 'images/perfume1.jpg'),
(8, 1, 'images/boneca1.jpg'),
(9, 1, 'images/cadeira1.jpg'),
(10, 1, 'images/volante1.jpg'),
(11, 1, 'images/mouse1.jpg'),
(12, 1, 'images/console1.jpg'),
(13, 1, 'images/racao1.jpg'),
(14, 1, 'images/anel1.jpg'),
(15, 1, 'images/martelo1.jpg'),
(16, 1, 'images/chocolate1.jpg'),
(17, 1, 'images/vinho1.jpg'),
(18, 1, 'images/bota1.jpg'),
(19, 1, 'images/mala1.jpg'),
(20, 1, 'images/violao1.jpg');

-- Opções de Produto
INSERT INTO Product_options (product_id, title, shape, radius, type, values_ProductOption) VALUES
(1, 'Cor', 'circle', 0, 'color', 'preto,branco,azul'),
(2, 'Tamanho', 'square', 0, 'text', 'P,M,G,GG'),
(3, 'Memória', 'square', 0, 'text', '8GB,16GB,32GB'),
(4, 'Numeração', 'square', 0, 'text', '37,38,39,40,41'),
(5, 'Idioma', 'square', 0, 'text', 'português,inglês,espanhol'),
(6, 'Quadro', 'square', 0, 'text', '15,17,19'),
(7, 'Volume', 'square', 0, 'text', '50ml,100ml,150ml'),
(8, 'Cor', 'circle', 0, 'color', 'rosa,amarelo,azul'),
(9, 'Material', 'square', 0, 'text', 'plástico,metal,alumínio'),
(10, 'Modelo', 'square', 0, 'text', 'esportivo,clássico'),
(11, 'DPI', 'square', 0, 'text', '800,1600,3200'),
(12, 'Armazenamento', 'square', 0, 'text', '500GB,1TB,2TB'),
(13, 'Peso', 'square', 0, 'text', '1kg,2kg,5kg'),
(14, 'Tamanho', 'square', 0, 'text', 'P,M,G'),
(15, 'Tipo', 'square', 0, 'text', 'claw,ballpeen,sledge'),
(16, 'Sabor', 'square', 0, 'text', 'ao leite,amargo,branco'),
(17, 'Safra', 'square', 0, 'text', '2018,2019,2020'),
(18, 'Tamanho', 'square', 0, 'text', '36,37,38,39,40'),
(19, 'Capacidade', 'square', 0, 'text', '20L,40L,60L'),
(20, 'Cordas', 'square', 0, 'text', 'nylon,aço');

-- Associação Produto-Categoria
INSERT INTO Product_categories (product_id, category_id) VALUES
(1, 1),
(2, 2),
(3, 9),
(4, 16),
(5, 3),
(6, 4),
(7, 5),
(8, 6),
(9, 7),
(10, 8),
(11, 9),
(12, 10),
(13, 11),
(14, 12),
(15, 13),
(16, 14),
(17, 15),
(18, 16),
(19, 17),
(20, 20);
-- Requisito 01 - Tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Requisito 02 - Tabela de categorias
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    use_in_menu BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Requisito 03 - Tabela de produtos
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enabled BOOLEAN DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    use_in_menu BOOLEAN DEFAULT 0,
    stock INT DEFAULT 0,
    description TEXT,
    price FLOAT NOT NULL,
    price_with_discount FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Requisito 04 - Tabela de imagens do produto
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    -- VER NECESSIDADE
    content LONGTEXT,
    enabled BOOLEAN DEFAULT 0,
    path VARCHAR(500) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id)
);

-- Requisito 05 - Tabela de opções do produto
CREATE TABLE product_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    shape ENUM('square', 'circle') DEFAULT 'square',
    radius INT DEFAULT 0,
    type ENUM('text', 'color') DEFAULT 'text',
    option_values TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id)
);

-- Requisito 06 - Tabela de produtos e categoria (relacionamento many-to-many)
-- Dropar a tabela atual se existir
DROP TABLE IF EXISTS product_category;
DROP TABLE IF EXISTS product_categories;

-- Criar a tabela com o nome correto (plural)
CREATE TABLE product_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_category (product_id, category_id),
    INDEX idx_product_id (product_id),
    INDEX idx_category_id (category_id)
);


-- Inserir usuários de exemplo (senhas hasheadas com bcrypt)
INSERT INTO users (firstname, surname, email, password) VALUES
('João', 'Silva', 'joao.silva@email.com', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjPeGvGzjYwjUxMI7.NU7VYnCJSdTu'), -- senha: 123456
('Maria', 'Santos', 'maria.santos@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- senha: password
('Pedro', 'Oliveira', 'pedro.oliveira@email.com', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjPeGvGzjYwjUxMI7.NU7VYnCJSdTu'), -- senha: 123456
('Ana', 'Costa', 'ana.costa@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- senha: password

-- Inserir categorias de exemplo
INSERT INTO categories (name, slug, use_in_menu) VALUES
('Roupas Masculinas', 'roupas-masculinas', 1),
('Roupas Femininas', 'roupas-femininas', 1),
('Camisetas', 'camisetas', 1),
('Calças', 'calcas', 1),
('Acessórios', 'acessorios', 0),
('Sapatos', 'sapatos', 1),
('Bolsas', 'bolsas', 0);

-- Inserir produtos de exemplo
INSERT INTO products (enabled, name, slug, use_in_menu, stock, description, price, price_with_discount) VALUES
(1, 'Camiseta Básica Masculina', 'camiseta-basica-masculina', 1, 50, 'Camiseta básica 100% algodão, confortável e versátil', 49.90, 39.90),
(1, 'Calça Jeans Feminina', 'calca-jeans-feminina', 1, 30, 'Calça jeans skinny com elastano, modelagem perfeita', 129.90, 99.90),
(1, 'Tênis Esportivo', 'tenis-esportivo', 1, 25, 'Tênis para corrida e caminhada, muito confortável', 199.90, 179.90),
(0, 'Bolsa de Couro', 'bolsa-de-couro', 0, 15, 'Bolsa de couro legítimo, elegante e durável', 299.90, 249.90),
(1, 'Camiseta Estampada', 'camiseta-estampada', 1, 40, 'Camiseta com estampa exclusiva, 100% algodão', 59.90, 49.90);

-- Inserir imagens dos produtos
-- Inserir imagens dos produtos (refatorado)
INSERT INTO product_images (product_id, enabled, path) VALUES
-- Produto 1: Camiseta Básica Masculina
(1, 1, '/images/products/camiseta-basica-masculina-frente.jpg'),
(1, 1, '/images/products/camiseta-basica-masculina-costas.jpg'),
(1, 1, '/images/products/camiseta-basica-masculina-detalhe.jpg'),
(1, 0, '/images/products/camiseta-basica-masculina-modelo.jpg'), -- desabilitada

-- Produto 2: Calça Jeans Feminina  
(2, 1, '/images/products/calca-jeans-feminina-frente.jpg'),
(2, 1, '/images/products/calca-jeans-feminina-costas.jpg'),
(2, 1, '/images/products/calca-jeans-feminina-lateral.jpg'),
(2, 0, '/images/products/calca-jeans-feminina-detalhe-bolso.jpg'), -- desabilitada

-- Produto 3: Tênis Esportivo
(3, 1, '/images/products/tenis-esportivo-lateral.jpg'),
(3, 1, '/images/products/tenis-esportivo-superior.jpg'),
(3, 1, '/images/products/tenis-esportivo-sola.jpg'),
(3, 1, '/images/products/tenis-esportivo-par.jpg'),

-- Produto 4: Bolsa de Couro
(4, 1, '/images/products/bolsa-couro-frente.jpg'),
(4, 1, '/images/products/bolsa-couro-interior.jpg'),
(4, 0, '/images/products/bolsa-couro-modelo.jpg'), -- desabilitada

-- Produto 5: Camiseta Estampada
(5, 1, '/images/products/camiseta-estampada-frente.jpg'),
(5, 1, '/images/products/camiseta-estampada-costas.jpg'),
(5, 1, '/images/products/camiseta-estampada-detalhe-estampa.jpg');


-- Inserir opções dos produtos
INSERT INTO product_options (product_id, title, shape, radius, type, option_values) VALUES
-- Camiseta Básica Masculina
(1, 'Tamanho', 'square', 4, 'text', 'PP,P,M,G,GG'),
(1, 'Cor', 'circle', 8, 'color', '#FFFFFF,#000000,#FF0000,#0000FF'),
-- Calça Jeans Feminina
(2, 'Tamanho', 'square', 4, 'text', '36,38,40,42,44'),
(2, 'Cor', 'circle', 6, 'color', '#000080,#4169E1,#000000'),
-- Tênis Esportivo
(3, 'Tamanho', 'square', 4, 'text', '35,36,37,38,39,40,41,42,43,44'),
(3, 'Cor', 'circle', 8, 'color', '#FFFFFF,#000000,#FF0000'),
-- Bolsa de Couro
(4, 'Cor', 'circle', 8, 'color', '#8B4513,#000000,#A0522D'),
-- Camiseta Estampada
(5, 'Tamanho', 'square', 4, 'text', 'P,M,G,GG'),
(5, 'Estampa', 'square', 6, 'text', 'Floral,Geométrica,Abstrata');

-- Relacionar produtos com categorias
-- Inserir categorias
-- Inserir relacionamentos produto-categoria
INSERT INTO product_categories (product_id, category_id) VALUES
-- Camiseta Básica Masculina (produto 1)
(1, 1), -- Roupas Masculinas
(1, 3), -- Camisetas
-- Calça Jeans Feminina (produto 2)
(2, 2), -- Roupas Femininas
(2, 4), -- Calças
-- Tênis Esportivo (produto 3)
(3, 1), -- Roupas Masculinas
(3, 2), -- Roupas Femininas
(3, 6), -- Sapatos
(3, 8), -- Esportes
-- Bolsa de Couro (produto 4)
(4, 2), -- Roupas Femininas
(4, 5), -- Acessórios
(4, 7), -- Bolsas
-- Camiseta Estampada (produto 5)
(5, 1), -- Roupas Masculinas
(5, 2), -- Roupas Femininas
(5, 3); -- Camisetas


-- Consultas úteis para verificar os dados inseridos

-- Buscar todos os usuários
SELECT id, firstname, surname, email, created_at FROM users;

-- Buscar categorias ativas no menu
SELECT * FROM categories WHERE use_in_menu = 1;

-- Buscar produtos habilitados com suas categorias
SELECT 
    p.id,
    p.name,
    p.slug,
    p.price,
    p.price_with_discount,
    p.stock,
    GROUP_CONCAT(c.name) as categories
FROM products p
LEFT JOIN product_category pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
WHERE p.enabled = 1
GROUP BY p.id;

-- Buscar produto completo com imagens e opções
SELECT 
    p.*,
    pi.path as image_path,
    po.title as option_title,
    po.type as option_type,
    po.values as option_values
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.enabled = 1
LEFT JOIN product_options po ON p.id = po.product_id
WHERE p.slug = 'camiseta-basica-masculina';

-- Contar produtos por categoria
SELECT 
    c.name as category_name,
    COUNT(pc.product_id) as product_count
FROM categories c
LEFT JOIN product_category pc ON c.id = pc.category_id
LEFT JOIN products p ON pc.product_id = p.id AND p.enabled = 1
GROUP BY c.id, c.name
ORDER BY product_count DESC;

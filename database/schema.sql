CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  image2 VARCHAR(255),
  image3 VARCHAR(255),
  image4 VARCHAR(255),
  image5 VARCHAR(255),
  image6 VARCHAR(255),
  highlight VARCHAR(255)
);

INSERT INTO products (name, category, price, description, image, highlight) VALUES
('Macrame Bracelet Tiger Eyes Stone', 'Bracelet', 150000, 'Gelangan tangan makrame dengan batu tiger eyes, cocok untuk gaya boho.', 'https://via.placeholder.com/640x480', 'Best Seller'),
('Handcrafted Necklace', 'Necklace', 175000, 'Kalung handmade dengan desain minimalis, ideal untuk sehari-hari.', 'https://via.placeholder.com/640x480', 'Populer');

INSERT INTO products (name, category, price, description, image, highlight) VALUES
('Beaded Bracelet - Ocean', 'Bracelet', 95000, 'Gelang manik-manik tema laut.', 'https://via.placeholder.com/640x480', 'Featured'),
('Silver Minimal Necklace', 'Necklace', 125000, 'Kalung silver sederhana untuk daily wear.', 'https://via.placeholder.com/640x480', ''),
('Sterling Ring Classic', 'Ring', 85000, 'Cincin sterling dengan finishing matte.', 'https://via.placeholder.com/640x480', ''),
('Dangling Pearl Earrings', 'Earrings', 110000, 'Anting mutiara yang elegan.', 'https://via.placeholder.com/640x480', 'Featured'),
('Leather Wrap Bracelet', 'Bracelet', 78000, 'Gelang kulit model wrap.', 'https://via.placeholder.com/640x480', ''),
('Gold Plated Necklace', 'Necklace', 220000, 'Kalung plating emas dengan detail batu kecil.', 'https://via.placeholder.com/640x480', 'Best Seller'),
('Stackable Rings Set', 'Ring', 135000, 'Set cincin yang bisa digabungkan.', 'https://via.placeholder.com/640x480', ''),
('Hoop Earrings Large', 'Earrings', 65000, 'Anting hoop besar untuk statement look.', 'https://via.placeholder.com/640x480', ''),
('Charm Bracelet Vintage', 'Bracelet', 145000, 'Gelang dengan charm vintage pilihan.', 'https://via.placeholder.com/640x480', 'Featured'),
('Layered Necklace Set', 'Necklace', 195000, 'Set kalung bertingkat untuk tampilan chic.', 'https://via.placeholder.com/640x480', ''),
('Signet Ring Modern', 'Ring', 98000, 'Cincin signet dengan ukiran minimal.', 'https://via.placeholder.com/640x480', ''),
('Crystal Drop Earrings', 'Earrings', 120000, 'Anting dengan crystal drop yang berkilau.', 'https://via.placeholder.com/640x480', ''),
('Braided Friendship Bracelet', 'Bracelet', 45000, 'Gelang persahabatan warna-warni.', 'https://via.placeholder.com/640x480', ''),
('Pearl Choker', 'Necklace', 160000, 'Choker mutiara untuk pesta dan acara formal.', 'https://via.placeholder.com/640x480', 'Populer'),
('Open Band Ring', 'Ring', 72000, 'Cincin open-band dengan desain kontemporer.', 'https://via.placeholder.com/640x480', ''),
('Stud Earrings Minimal', 'Earrings', 35000, 'Anting stud kecil untuk pemakaian sehari-hari.', 'https://via.placeholder.com/640x480', ''),
('Macrame Anklet', 'Bracelet', 55000, 'Gelang pergelangan kaki dengan teknik macrame.', 'https://via.placeholder.com/640x480', ''),
('Locket Necklace Vintage', 'Necklace', 210000, 'Kalung locket dengan sentuhan vintage.', 'https://via.placeholder.com/640x480', ''),
('Chevron Ring', 'Ring', 68000, 'Cincin motif chevron yang modern.', 'https://via.placeholder.com/640x480', ''),
('Feather Earrings', 'Earrings', 48000, 'Anting motif bulu yang ringan.', 'https://via.placeholder.com/640x480', 'Featured');

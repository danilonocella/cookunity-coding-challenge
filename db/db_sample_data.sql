-- Create enums
CREATE TYPE card_type AS ENUM (
    'Grass', 'Fire', 'Water', 'Electric', 'Psychic', 'Fighting', 
    'Darkness', 'Metal', 'Dragon', 'Fairy', 'Colorless'
);

CREATE TYPE rarity AS ENUM (
    'Common', 'Uncommon', 'Rare'
);

CREATE TYPE expansion AS ENUM (
    'Base set', 'Jungle', 'Fossil', 'Base set 2', 
    'Team rocket', 'Gym heroes', 'Gym challenge'
);

-- Create attack table
CREATE TABLE attack (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    damage INTEGER NOT NULL
);

-- Create weakness table
CREATE TABLE weakness (
    id SERIAL PRIMARY KEY,
    main_type card_type NOT NULL,
    weakness_type card_type NOT NULL
);

-- Create card table
CREATE TABLE card (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    card_type card_type NOT NULL,
    rarity rarity NOT NULL,
    expansion expansion NOT NULL,
    hit_points INTEGER NOT NULL,
    attack_id INTEGER NOT NULL,
    weakness_id INTEGER NOT NULL,
    resistance_type card_type,
    resistance_points INTEGER,
    FOREIGN KEY (attack_id) REFERENCES attack (id),
    FOREIGN KEY (weakness_id) REFERENCES weakness (id)
);

-- Insert sample data into attack table
INSERT INTO attack (name, damage) VALUES 
('Tackle', 10),
('Flamethrower', 90),
('Water Gun', 40),
('Gnaw', 20),
('Bite', 10),
('Submission', 60);

-- Insert sample data into weakness table
INSERT INTO weakness (main_type, weakness_type) VALUES
('Grass', 'Fire'),
('Fire', 'Water'),
('Water', 'Grass'),
('Electric', 'Fighting'),
('Colorless', 'Fighting'),
('Fighting', 'Psychic');

-- Insert sample data into card table
INSERT INTO card (name, type, rarity, expansion, hit_points, resistance_type, resistance_points, attack_id, weakness_id) VALUES
('Bulbasaur', 'Grass', 'Common', 'Base set', 45, 'Water', 20, 1, 1),
('Charizard', 'Fire', 'Rare', 'Base set', 120, 'Grass', 30, 2, 2),
('Squirtle', 'Water', 'Common', 'Base set', 40, 'Fire', 20, 3, 3),
('Pikachu', 'Electric', 'Common', 'Base set', 40, 'Colorless', 20, 4, 4),
('Rattata', 'Colorless', 'Common', 'Base set', 40, NULL, NULL, 5, 5),
('Machoke', 'Fighting', 'Uncommon', 'Base set', 80, NULL, NULL, 6, 6);

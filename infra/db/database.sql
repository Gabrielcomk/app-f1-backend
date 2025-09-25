CREATE DATABASE IF NOT EXISTS f1_teams;
USE f1_teams;

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team_id INT,
    is_titular BOOLEAN NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

INSERT INTO teams (name) VALUES
('Mercedes'),
('Red Bull Racing'),
('Ferrari'),
('McLaren'),
('Aston Martin'),
('Alpine'),
('Williams'),
('RB'),
('Sauber'),
('Haas');

INSERT INTO drivers (name, team_id, is_titular) VALUES
('Max Verstappen', 1, TRUE),
('Yuki Tsunoda', 1, TRUE),
('Charles Leclerc', 2, TRUE),
('Lewis Hamilton', 2, TRUE),
('Mick Schumacher', 2, FALSE),
('Valtteri Bottas', 2, FALSE),
('George Russell', 3, TRUE),
('Andrea Kimi Antonelli', 3, TRUE),
('Lando Norris', 4, TRUE),
('Oscar Piastri', 4, TRUE),
('Fernando Alonso', 5, TRUE),
('Lance Stroll', 5, TRUE),
('Felipe Drugovich', 5, FALSE),
('Pierre Gasly', 6, TRUE),
('Franco Colapinto', 6, TRUE),
('Jack Doohan', 6, FALSE),
('Alex Albon', 7, TRUE),
('Carlos Sainz', 7, TRUE),
('Liam Lawson', 8, TRUE),
('Isack Hadjar', 8, TRUE),
('Nico Hulkenberg', 9, TRUE),
('Gabriel Bortoleto', 9, TRUE),
('Esteban Ocon', 10, TRUE),
('Oliver Bearman', 10, TRUE);
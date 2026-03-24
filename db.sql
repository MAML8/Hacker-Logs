CREATE TABLE User_(
    user_name VARCHAR(50) PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    password_ TINYTEXT NOT NULL,
    clearance_level SMALLINT NOT NULL Default 0
);

CREATE TABLE Study(
    access_name VARCHAR(50) PRIMARY KEY,
    display_name TINYTEXT NOT NULL,
    clearance_level_to_access SMALLINT NOT NULL Default 1
);

CREATE TABLE Log(
    hora TIMESTAMP,
    access_name VARCHAR(50),
    PRIMARY KEY(hora, access_name),
    FOREIGN KEY(access_name) REFERENCES Study(access_name),
    user_name VARCHAR(50) NOT NULL,
    FOREIGN KEY(user_name) REFERENCES User_(user_name),
    texto TEXT NOT NULL
);
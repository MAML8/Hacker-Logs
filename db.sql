CREATE TABLE User(
    VARCHAR(50) user_name PRIMARY KEY,
    VARCHAR(100) display_name NOT NULL,
    TINYTEXT password_ NOT NULL,
    SMALLINT clearance_level NOT NULL Default 0
);

CREATE TABLE Study(
    VARCHAR(50) access_name PRIMARY KEY,
    TINYTEXT display_name NOT NULL,
    SMALLINT clearance_level_to_access NOT NULL Default 1
);

CREATE TABLE Log(
    TIMESTAMP hora,
    VARCHAR(50) access_name,
    PRIMARY KEY(hora, access_name),
    FOREIGN KEY(access_name) REFERENCES Study(access_name),
    VARCHAR(50) user_name NOT NULL,
    FOREIGN KEY(user_name) REFERENCES User(user_name),
    TEXT texto NOT NULL
);
-- This is a fix to enable node mysql to connect to db
-- ALTER USER 'my_username'@'my_host' IDENTIFIED WITH 'mysql_native_password' BY 'my_password';
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Wabo_90_mba*#';

-- create table
CREATE DATABASE cwk_dms;

-- dms_profiles

create table dms_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40),
    description VARCHAR(100) NOT NULL
);
--default profiles
INSERT INTO dms_profiles (name, description) VALUES ('admin', 'administrator');
INSERT INTO dms_profiles (name, description) VALUES ('client', 'cwk client');


-- dms_users (password is a bcrypt hash - 60 chars)

create table dms_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(30),
    email VARCHAR(50),
    phone VARCHAR(15),
    address VARCHAR(50),
    industry VARCHAR(30),
    tax_obligation VARCHAR(50),
    tax_status VARCHAR(13)
    fees_charged INT(9)
    statement INT(9),
    comments VARCHAR(250),
    profile INT,
    FOREIGN KEY (profile) REFERENCES dms_profile (id) 
    ON UPDATE RESTRICT 
    ON DELETE CASCADE
);
--default user
INSERT INTO dms_users (username, password, profile) VALUES ('admin', 'password', 1);
-- alter table dms_users
/* ALTER TABLE dms_users ADD COLUMN fullname VARCHAR(30);
ALTER TABLE dms_users ADD COLUMN email VARCHAR(50);
ALTER TABLE dms_users ADD COLUMN phone VARCHAR(15);
ALTER TABLE dms_users ADD COLUMN address VARCHAR(50);
ALTER TABLE dms_users ADD COLUMN industry VARCHAR(30);
ALTER TABLE dms_users ADD COLUMN tax_obligation VARCHAR(50);
ALTER TABLE dms_users ADD COLUMN tax_status VARCHAR(13);
ALTER TABLE dms_users ADD COLUMN fees_charged INT(9);
ALTER TABLE dms_users ADD COLUMN statement INT(9);
ALTER TABLE dms_users ADD COLUMN comments VARCHAR(250); */


-- TODO: dms_user_details (other details for user profile: depends on user_id)

-- dms_status
create table dms_status (
    id INT PRIMARY KEY,
    description VARCHAR(15)
);
-- default dms_status (id: 20 - )
INSERT INTO dms_status (id, description) VALUES(21, 'New');
INSERT INTO dms_status (id, description) VALUES(22, 'In Progress');
INSERT INTO dms_status (id, description) VALUES(23, 'Downloaded');
INSERT INTO dms_status (id, description) VALUES(24, 'Finished');

--dms_doc_types
create table dms_doc_types (
    id INT PRIMARY KEY,
    description VARCHAR(15)
);
INSERT INTO dms_doc_types (id, description) VALUES (1, 'Core Documents');
INSERT INTO dms_doc_types (id, description) VALUES (2, 'Other Documents');

-- dms_documents
create table dms_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    url VARCHAR(100) NOT NULL,
    owner INT,
    status INT,
    doc_type INT,
    period VARCHAR(9) NOT NULL,
    upload_date DATE NOT NULL,
    comments VARCHAR(250),
    FOREIGN KEY (owner) REFERENCES dms_users (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE,
    FOREIGN KEY (status) REFERENCES dms_status (id)
        ON UPDATE RESTRICT 
        ON DELETE CASCADE,
    FOREIGN KEY (doc_type) REFERENCES dms_doc_types (id)
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
);
-- Start sequence from 100
ALTER TABLE dms_documents AUTO_INCREMENT = 100; 

-- Create view
CREATE VIEW vw_dms_documents AS 
SELECT 
 a.id,
 a.title,
 a.url,
 a.owner, 
 b.username,
 a.status, 
 d.description AS status_name,
 a.doc_type, 
 c.description AS doc_type_name,
 a.period, 
 a.upload_date, 
 a.comments
FROM dms_documents a 
LEFT JOIN dms_users b ON a.owner = b.id
LEFT JOIN dms_doc_types c ON a.doc_type = c.id
LEFT JOIN dms_status d ON a.status = d.id;

CREATE TABLE family(
    fam_id uuid DEFAULT uuid_generate_v4(),
    fam_name VARCHAR(255),
    image VARCHAR(255),
    PRIMARY KEY(fam_id)
);

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    fam_id TEXT[] DEFAULT [],
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE products(
    pro_id uuid DEFAULT uuid_generate_v4(),
    fam_id UUID,
    user_id UUID,
    requsted_by VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    requsted_at TEXT,
    PRIMARY KEY(pro_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (fam_id) REFERENCES family(fam_id)
);



-- create extension if not exists "uuid-ossp";
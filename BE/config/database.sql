set search_path=public;

CREATE TABLE usr (
    id SERIAL primary key,
    username varchar(50),
    password varchar(50),
    fullname varchar(50),
    email varchar(50),
    phoneNumber varchar(20),

    unique(username)
);

exit;
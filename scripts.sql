create table split
(
    Split_id serial PRIMARY KEY,
    Name VARCHAR (50) UNIQUE NOT NULL,
    user_id serial NOT NULL
);

insert into split
    (split_id, name, user_id)
values
    (0, 'Push', 0);
insert into split
    (split_id, name, user_id)
values
    (1, 'Pull', 0);
insert into split
    (split_id, name, user_id)
values
    (2, 'Legs', 0);
create table split
(
    split_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    user_id INT NOT NULL
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


create table exercise
(
    exercise_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    split_id INT NOT NULL,
    last_modified_date DATE NOT NULL,
    weight INT NOT NULL,
    reps INT NOT NULL,
    sets int NOT NULL
);

insert into exercise
    ( exercise_id, name, split_id, last_modified_date, weight, reps, sets)
values
    (0, 'Bench Press', 0, NOW(), 150, 5, 5);
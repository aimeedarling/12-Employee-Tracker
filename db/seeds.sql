INSERT INTO department (department_name)
VALUES ('trash panda'),
('cry baby'),
('ugly salon'),
('espresso martini'),
('grimace');


INSERT INTO role (title, salary, department_id)
VALUES ('daddy tp', 20, 001),
('master cry-er', 30, 001),
('uglitician', 50, 003),
('gma', 15, 002),
('grimace', 100, 004),
('pokie-man', 100, 005);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Barla', 'Streetz', 003, null),
('bulba', 'saur', 004, 001),
('grimace', 'purple', 005, 002),
('aimee', 'darling', 006, 003),
('stinky', 'sebastian', 001, 004);
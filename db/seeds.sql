INSERT INTO department (department_name)
VALUES ('grandma'),
('cry baby'),
('hot boiz'),
('gottacatchthemall'),
('grimace');


INSERT INTO role (title, salary, department_id)
VALUES ('daddys truck', 20, 001),
('master cry-er', 30, 001),
('gma', 15, 001),
('grimace', 100, 005),
('pokie-man', 100, 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('gma', 'g', 001, null),
('bulba', 'saur', 005, 001),
('grimace', 'purple', 004, 002),
('aimee', 'darling', 002, 003),
('stinky', 'sebastian', 003, 004);
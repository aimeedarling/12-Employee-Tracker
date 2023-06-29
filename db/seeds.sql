INSERT INTO department (department_name)
VALUES ('nursing'),
('technician'),
('management'),
('medical'),
('anesthesia');


INSERT INTO role (id, title, salary, department_id)
VALUES (001, 'clinical nurse', 20, 001),
(002, 'charge nurse', 30, 001),
(003, 'nurse manager', 50, 003),
(004, 'endoscopy technician', 15, 002),
(005, 'gastroenterologist', 100, 004),
(006, 'anesthesiologist', 100, 005);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('kent', 'dobson', 003, null),
('adrian', 'montero', 004, 001),
('anoop', 'shah', 005, null),
('kelly', 'tseng', 006, null),
('aimee', 'darling', 001, 002),
('sarah', 'rogers', 003, 005);
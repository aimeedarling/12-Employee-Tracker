INSERT INTO department (department_name)
VALUES ('nursing'),
('technician'),
('management'),
('medical'),
('anesthesia');


INSERT INTO role (title, salary, department_id)
VALUES ('clinical nurse', 20, 001),
('charge nurse', 30, 001),
('nurse manager', 50, 003),
('endoscopy technician', 15, 002),
('gastroenterologist', 100, 004),
('anesthesiologist', 100, 005);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('kent', 'dobson', 003, null),
('adrian', 'montero', 004, 001),
('anoop', 'shah', 005, null),
('kelly', 'tseng', 006, null),
('aimee', 'darling', 001, 002),
('sarah', 'rogers', 003, 005);
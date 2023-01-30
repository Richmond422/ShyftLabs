create table student(
id int not null auto_increment,
firstName varchar(100) not null,
familyName varchar(100) not null,
birthDate date not null,
primary key(id));

create table course(
id int not null auto_increment,
name varchar(100) not null,
primary key(id));

create table grade(
id int not null auto_increment,
studentID int not null,
courseID int not null,
score enum('A', 'B', 'C', 'D', 'E', 'F'),
primary key (id),
foreign key (studentID) references student(id),
foreign key (courseID) references course(id));


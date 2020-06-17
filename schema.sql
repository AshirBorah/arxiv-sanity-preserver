drop table if exists user;
create table user (
  first_name text not null,
  last_name text not null,
  e_mail text not null,
  institution text not null,
  user_id integer primary key autoincrement,
  username text not null,
  pw_hash text not null,
  creation_time integer
);
drop table if exists library;
create table library (
  lib_id integer primary key autoincrement,
  paper_id text not null,
  user_id integer not null,
  update_time integer
);

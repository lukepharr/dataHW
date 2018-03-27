Use Sakila;
#1a
select first_name, last_name from actor;
#1b
select concat(first_name, ' ', last_name) from actor;
#2a
select first_name, last_name, actor_id from actor
where first_name = 'Joe';
#2b
select first_name, last_name, actor_id from actor
where last_name like '%gen%';

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
#2c
select first_name, last_name, actor_id from actor
where last_name like '%li%' 
order by last_name, first_name;
#2d 
select country_id, country from country
where country in ('Afghanistan','Bangladesh','China');
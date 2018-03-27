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
#3a 
alter table actor
add column middle_name varchar(100) after first_name;
#3b
alter table actor
modify middle_name blob;
#3c
alter table actor
drop middle_name;
#4a
select last_name, count(*) from actor group by last_name;
#4b
select last_name, count(*) from actor group by last_name
having count(*) > 1; 
#4c
update actor set first_name = 'Harpo' where first_name = 'Groucho' and last_name='Williams';
#4d
update actor 
set first_name = case when first_name='Harpo' then 'Groucho' else 'Mucho Groucho' end
where (actor_id=172);


172
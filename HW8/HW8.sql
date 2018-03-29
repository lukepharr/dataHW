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
#5a
show create table address;
#result: CREATE TABLE `address` (\n  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,\n  `address` varchar(50) NOT NULL,\n  `address2` varchar(50) DEFAULT NULL,\n  `district` varchar(20) NOT NULL,\n  `city_id` smallint(5) unsigned NOT NULL,\n  `postal_code` varchar(10) DEFAULT NULL,\n  `phone` varchar(20) NOT NULL,\n  `location` geometry NOT NULL,\n  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  PRIMARY KEY (`address_id`),\n  KEY `idx_fk_city_id` (`city_id`),\n  SPATIAL KEY `idx_location` (`location`),\n  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE\n) ENGINE=InnoDB AUTO_INCREMENT=606 DEFAULT CHARSET=utf8
#6a
select staff.first_name, staff.last_name, address.address
from staff
inner join address
on staff.address_id=address.address_id;
#6b
select staff.first_name, staff.last_name, sum(payment.amount)
from staff
inner join payment
on staff.staff_id=payment.staff_id
where month(payment.payment_date)=8 and year(payment.payment_date)=2005
group by first_name, last_name;


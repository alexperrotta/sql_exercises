CREATE TABLE restaurant (
    id serial primary key,
    name varchar,
    distance varchar,
    stars integer,
    category varchar,
    favorite_dish varchar,
    does_takeout boolean,
    recent_visit varchar
);


-- 1. The names of the restaurants that you gave a 5 stars to

SELECT restaurant_name
FROM restaurant
WHERE stars = 5;

-- 2. The favorite dishes of all 5-star restaurants

SELECT fav_dish
FROM restaurant
WHERE stars = 5;

-- 3. The the id of a restaurant by a specific restaurant name, say ‘NaanStop’ 

SELECT id
FROM restaurant
WHERE restaurant_name = 'Zoes';

-- 4. restaurants in the category of ‘BBQ’

SELECT restaurant_name
FROM restaurant
WHERE category = 'BBQ';

-- 5. restaurants that do take out

SELECT restaurant_name
FROM restaurant
WHERE does_takeout = false;

-- 6. restaurants that do take out and is in the category of ‘BBQ’

SELECT restaurant_name
FROM restaurant
WHERE does_takeout = false
AND category = 'BBQ';

-- 7. restaurants within 2 miles

SELECT restaurant_name
FROM restaurant
WHERE distance < 2;

-- 8. restaurants you haven’t ate at in the last week

SELECT restaurant_name
FROM restaurant
WHERE last_visit > '2018-05-18';

-- 9. restaurants you haven’t ate at in the last week and has 5 stars

SELECT restaurant_name
FROM restaurant
WHERE last_visit > '2018-05-18'
AND stars = 5;

-- Aggregations

-- 1. list restaurants by the closest distance.

SELECT restaurant_name
FROM restaurant
ORDER BY distance;


-- 2. list the top 2 restaurants by distance.
-- 3. list the top 2 restaurants by stars.
-- 4. list the top 2 restaurants by stars where the distance is less than 2 miles. 
-- 5. count the number of restaurants in the db.
-- 6. count the number of restaurants by category.
-- 7. get the average stars per restaurant by category.
-- 8. get the max stars of a restaurant by category.





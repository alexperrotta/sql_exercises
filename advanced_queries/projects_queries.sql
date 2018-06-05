-- Create a new database called projects_db and restore it from the projects.sql file via the command:
--    psql projects_db -f projects.sql

-- projects_db - id, name
-- projects_uses_tech - project_id, tech_id
-- tech - id, name

-- 1. What are all projects that use JavaScript?

SELECT project.name
FROM projects_db
INNER JOIN projects_uses_tech
ON projects.id = project_uses_tech.project_id

-- 2. What are all technologies used by the Personal Website?

SELECT tech.name
FROM tech
INNER JOIN projects_db
ON tech.id = projects_db.id


-- 3. Perform a left outer join from the tech table to the project_uses_tech table - which techs has
-- no associated project?

SELECT tech.name
FROM tech
LEFT OUTER JOIN project_uses_tech
ON tech.id = projects_uses_tech.tech_id

-- 4. Based on the previous query, get the count of the number of techs used by each project.

SELECT COUNT (tech.name) as total
FROM tech
LEFT OUTER JOIN project_uses_tech
ON tech.id = projects_uses_tech.tech_id

-- 5. Perform a left outer join from the project table to the project_users_tech table - which
-- projects has no associated tech?
-- 6. Based on the previous query, get the count of the number of projects that use each tech.
-- 7. List all projects along with each technology used by it. You will need to do a three-way join.
-- 8. List all the distinct techs that are used by at least one project.
-- 9. List all the distinct techs that are not used by any projects.
-- 10. List all the distinct projects that use at least one tech.
-- 11. List all the distinct projects that use no tech.
-- 12. Order the projects by how many tech it uses.
-- 13. Order the tech by how many projects use it.
--   What is the average number of techs used by a project?
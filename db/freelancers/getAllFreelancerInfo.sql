SELECT *
FROM freelancer_profile JOIN users ON freelancer_profile.user_id = users.id
ORDER BY users.first_name ASC;

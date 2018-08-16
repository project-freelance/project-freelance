SELECT *
FROM users u JOIN emp_user_join emp ON u.id = emp.freelancer_id
WHERE emp.employer_post_id = $1
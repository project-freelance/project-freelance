INSERT INTO emp_user_join
    (employer_post_id, freelancer_id)
VALUES
    ($1, $2)
RETURNING *;
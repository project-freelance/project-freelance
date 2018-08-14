-- DELETE FROM emp_user_join
-- WHERE id = $1;
DELETE FROM emp_user_join
WHERE employer_post_id=$1 AND freelancer_id=$2;

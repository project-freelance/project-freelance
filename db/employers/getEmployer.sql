-- SELECT *
-- FROM employer_profile
-- WHERE user_id = $1;
SELECT *
FROM employer_profile e JOIN users u ON e.user_id=u.id
WHERE u.id = $1;
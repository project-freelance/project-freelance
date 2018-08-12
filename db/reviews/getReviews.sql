SELECT *
FROM reviews
WHERE user_id = $1
ORDER BY moment DESC;
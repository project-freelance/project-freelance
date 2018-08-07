UPDATE users 
    SET specialty = $2
WHERE id = $1
RETURNING *;
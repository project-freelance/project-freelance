UPDATE users 
    SET role = $2
WHERE id = $1
RETURNING *;
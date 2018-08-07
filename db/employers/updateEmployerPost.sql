UPDATE employer_post
    SET title=$2, body=$3, specialty=$4, price=$5
WHERE id=$1
RETURNING *;
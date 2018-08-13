UPDATE freelancer_profile
    SET heading=$2, bio=$3, skills=$4, experience=$5, city=$6, state=$7
WHERE user_id=$1
RETURNING *;
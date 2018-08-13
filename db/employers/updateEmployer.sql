UPDATE employer_profile
    SET heading=$2, bio=$3, company=$4, position=$5, city=$6, state=$7, company_logo=$8
WHERE user_id=$1
RETURNING *;
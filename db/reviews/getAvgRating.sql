SELECT round(avg(r.rating),2), u.id
FROM reviews r INNER JOIN users u ON r.user_id=u.id
GROUP BY u.id;  
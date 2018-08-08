SELECT round(avg(r.rating),2), u.id
FROM reviews r INNER JOIN users u ON r.user_id=u.id
GROUP BY u.id;  




-- select round(avg(r.rating),2), p.id
-- from reviews r INNER JOIN properties p ON r.post_id=p.id
-- group by p.id;
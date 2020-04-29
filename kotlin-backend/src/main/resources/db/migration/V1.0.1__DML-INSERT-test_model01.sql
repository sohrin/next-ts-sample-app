INSERT INTO test_model01 VALUES(1, 'name_val', current_timestamp);
SELECT setval('test_model01_id_seq', (SELECT MAX(id) FROM test_model01));
CREATE TABLE test_model01 (
    id bigserial
  , name character varying(11) not null
  , date timestamp(6) with time zone default CURRENT_TIMESTAMP
  , primary key (id)
);
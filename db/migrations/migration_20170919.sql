-- \c myfinances_dev;

ALTER TABLE transaction
add budget_id integer REFERENCES budget(id)

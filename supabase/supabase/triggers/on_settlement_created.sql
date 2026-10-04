create trigger on_settlement_created
after insert on settlements
for each row
execute procedure notify_settlement_created();


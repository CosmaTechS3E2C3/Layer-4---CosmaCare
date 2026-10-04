create trigger on_dispute_resolved
after update on disputes
for each row
when (new.status = 'resolved')
execute procedure notify_dispute_resolved();


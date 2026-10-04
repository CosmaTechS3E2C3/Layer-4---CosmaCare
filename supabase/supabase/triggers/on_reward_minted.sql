create trigger on_reward_minted
after insert on rewards
for each row
execute procedure notify_reward_minted();

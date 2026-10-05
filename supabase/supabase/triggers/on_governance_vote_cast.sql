CREATE OR REPLACE FUNCTION on_governance_vote_cast()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'governance.vote.cast',
    'vote_id', NEW.id,
    'proposal_id', NEW.proposal_id,
    'voter_address', NEW.voter_address,
    'voter_did', NEW.voter_did,
    'support', NEW.support
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


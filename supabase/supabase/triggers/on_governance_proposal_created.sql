CREATE OR REPLACE FUNCTION on_governance_proposal_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  payload := jsonb_build_object(
    'event', 'governance.proposal.created',
    'proposal_id', NEW.id,
    'proposer_address', NEW.proposer_address,
    'proposal_did', NEW.proposal_did,
    'title', NEW.title,
    'status', NEW.status
  );

  PERFORM pg_notify('cosmacare', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

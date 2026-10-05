CREATE OR REPLACE FUNCTION notify_governance_proposal_created()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'cosmacare',
    json_build_object(
      'type', 'governance.proposal.created',
      'proposal_id', NEW.id
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_governance_proposal_created
AFTER INSERT ON governance_proposals
FOR EACH ROW EXECUTE FUNCTION notify_governance_proposal_created();

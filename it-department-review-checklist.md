# IT Department Review Checklist

Use this as the default checklist for recurring IT reviews.

## Daily Check
- OpenClaw status / core runtime health checked
- Critical automations appear healthy
- No obvious reliability degradation
- No obvious access-control or exposure issue
- No missing or stale documentation creating immediate risk

## Weekly Check
- Monitoring and alerting gaps reviewed
- Backup / recovery assumptions reviewed
- Single points of failure reviewed
- Access hygiene / least-privilege concerns reviewed
- Secrets handling concerns reviewed
- Maintenance backlog and cleanup needs reviewed
- New systems or workflows checked for security or reliability gaps

## Escalate If
- real security exposure exists
- a critical system is broken or fragile
- backups or recovery confidence is weak
- credentials/access posture is unsafe
- the environment has drifted into a state likely to cause downtime or compromise

# IT Department Operating Rhythm

_Last updated: 2026-05-11_

This document defines the daily and weekly operating rhythm for the IT Department.

## Principle
The IT Department exists to keep Tyler's environment:
- secure
- reliable
- maintainable
- recoverable

The department should work proactively, not only when something breaks.

## Daily Rhythm

### Daily Systems & Security Check
**Cadence:** every weekday morning

**CITO**
- review the current technical risk picture
- decide whether any issue needs escalation to Carve or Tyler
- prioritize the day's IT work

**Cybersecurity Specialist**
- review meaningful security exposure or access-control concerns
- look for obvious hardening gaps, secret-handling risk, or suspicious changes

**Reliability Engineer**
- review system health, uptime signals, failed jobs, and reliability concerns
- look for broken automations, service degradation, or missing observability

**IT Ops Admin**
- review routine maintenance needs
- track update hygiene, documentation drift, and operational cleanup items

**Escalate only if material:**
- meaningful breach or exposure risk
- broken or failing critical automation
- degraded system reliability with business impact
- unclear recovery path or backup concern

If nothing material is found, stay quiet.

## Weekly Rhythm

### Weekly IT Maintenance & Hardening Review
**Cadence:** once per week

**CITO**
- review open IT risks and decide priorities for the next week
- determine whether any system needs redesign, cleanup, or stronger controls

**Cybersecurity Specialist**
- perform a broader hardening review
- identify any access, secret, exposure, or least-privilege concerns that should be fixed

**Reliability Engineer**
- review backup assumptions, monitoring gaps, single points of failure, and service dependencies
- identify resilience improvements

**IT Ops Admin**
- review documentation completeness, inventory hygiene, and routine maintenance backlog
- ensure operating notes remain current and usable

## Monthly / Periodic Focus Areas
When appropriate, the IT Department should also rotate through:
- access review
- secret rotation opportunities
- backup / restore confidence checks
- dependency health and stale tooling cleanup
- security posture review for new systems or accounts

## Escalation Standard
Escalate to Tyler only when:
- business risk is meaningful
- security risk is clear and practical
- downtime or fragility affects operations materially
- approval is needed for a non-trivial change

Otherwise escalate to Carve and keep the work moving.

## Authority Boundary
The IT Department may maintain, assess, recommend, and implement approved internal work.

The department may not make high-risk, irreversible, or externally consequential changes without the appropriate approval path.

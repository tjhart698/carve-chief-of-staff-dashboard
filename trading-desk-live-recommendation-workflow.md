# Live Trading Desk Recommendation Workflow

Use this whenever Tyler asks for a trade recommendation or when Carve proactively evaluates a trade idea for the project sleeve.

## Inputs
- ticker or trade idea
- latest relevant market/sector/company research
- `trading/current-holdings.md`
- `trading/trading-mandate.md`
- `trading/investing-thesis-2026-05-07.md`
- `chief-of-staff/trading-desk-charter.md`
- `chief-of-staff/trading-desk-review-workflow.md`
- live quote / account context when needed

## Operating Sequence
1. **Carve performs charter gate**
   - reject anything obviously outside scope
   - reject anything that breaches instrument, sizing, or approval rules
2. **Bull Analyst memo**
   - use `chief-of-staff/trading-desk-bull-analyst-template.md`
3. **Bear Analyst memo**
   - use `chief-of-staff/trading-desk-bear-analyst-template.md`
4. **Market Chief decision memo**
   - use `chief-of-staff/trading-desk-market-chief-template.md`
5. **Tyler-facing final recommendation**
   - use `chief-of-staff/trading-desk-final-recommendation-template.md`
6. **If Tyler approves**
   - only Carve may move into `trading/order-approval-workflow.md`
   - only Carve may generate the concrete execution ticket for submission
   - the three Trading Desk agents still do not gain trade authority after approval
   - do not submit anything until approval is explicit, written, and mapped to the ticket

## Account / API Use Rules
- Read-only account checks are allowed when needed for better recommendations
- Order placement is never allowed without Tyler approval
- Even after approval, the three Trading Desk agents may not place trades; execution authority remains with Carve only
- Any access to Public.com runs through Carve's environment and must still follow the charter
- The desk should treat account data as evidence, not as permission to act independently

## Default Decision Posture
- No forced activity
- WAIT and PASS are valid outcomes
- A weak idea should die before it reaches Tyler
- Only high-quality, mandate-compliant ideas should become approval requests

# Alert Network Team Feature

This feature allows users to generate AI-powered incident summaries and submit confirmed incidents to the network operations team.

## Database Setup

To create the required `confirmedIncidents` table, run the SQL script:

```sql
-- Connect to your PostgreSQL database and run:
psql -U your_username -d your_database -f prisma/create_confirmed_incidents_table.sql
```

Or manually execute the SQL in your database management tool (DBeaver, pgAdmin, etc.):

```sql
CREATE TABLE IF NOT EXISTS team_thread_forge."confirmedIncidents" (
  incident_id SERIAL PRIMARY KEY,
  zip_code VARCHAR(10) NOT NULL,
  outage_start_time TIMESTAMP(6) NOT NULL,
  outage_end_time TIMESTAMP(6) NOT NULL,
  affected_customers_count INTEGER NOT NULL,
  incident_summary TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Unresolved' NOT NULL,
  created_at TIMESTAMP(6) DEFAULT NOW() NOT NULL
);
```

## Regenerate Prisma Client

If you encounter issues with Prisma not recognizing the new model:

1. Stop the dev server (`Ctrl+C`)
2. Run: `npx prisma generate`
3. Restart the dev server: `npm run dev`

## Feature Usage

1. Open an outage in the Outage Details Pane
2. Click the "Alert Network Team" button (red button above the chat input)
3. Wait for the AI to generate an incident summary
4. Review the incident details in the confirmation modal
5. Click "Confirm & Submit" to save the incident to the database

## API Endpoints

### POST `/api/alert-network-team`

**Generate Action:**
```json
{
  "zip": "06604",
  "hours": 24,
  "action": "generate"
}
```

Returns incident data with AI-generated summary.

**Submit Action:**
```json
{
  "zip": "06604",
  "hours": 24,
  "action": "submit",
  "incidentData": {
    "zip_code": "06604",
    "outage_start_time": "2024-01-15T10:30:00Z",
    "outage_end_time": "2024-01-15T12:45:00Z",
    "affected_customers_count": 15,
    "incident_summary": "AI-generated summary..."
  }
}
```

Inserts the incident into the database.

## Technologies Used

- **Frontend**: React, TypeScript, Framer Motion, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **AI**: Anthropic Claude Haiku API
- **Database**: PostgreSQL


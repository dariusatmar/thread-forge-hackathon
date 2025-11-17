# Quick Start Guide - Generate 1,000 Transcripts

This guide will help you quickly generate 1,000 synthetic call transcripts for the hackathon.

## Prerequisites

1. Python 3.7 or higher installed
2. Anthropic API key

## Step-by-Step Instructions

### 1. Install Dependencies

```bash
cd transcript_factory
pip install -r requirements.txt
```

### 2. Set Your API Key

**Windows PowerShell:**
```powershell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

**Windows CMD:**
```cmd
set ANTHROPIC_API_KEY=your-api-key-here
```

**Linux/Mac:**
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 3. Run the Bulk Generation Script

```bash
python generate_bulk_transcripts.py
```

That's it! The script will:
- Generate **700** technical support (outage) transcripts
- Generate **150** billing inquiry transcripts  
- Generate **150** account management (upgrade) transcripts
- Show progress updates every 10 transcripts
- Display time estimates
- Save files with numbered names (e.g., `technical_support_0001.txt`)

## What You'll See

```
================================================================================
BULK TRANSCRIPT GENERATION
================================================================================

Total transcripts to generate: 1000

Breakdown by category:
  - technical_support: 700 transcripts
  - billing_inquiry: 150 transcripts
  - account_management: 150 transcripts

================================================================================
Starting generation for: TECHNICAL_SUPPORT
Target: 700 transcripts
================================================================================

Generating transcript for category: technical_support...
Saved transcript to: technical_support\technical_support_0001.txt

📊 Progress Update:
  - technical_support: 10/700 completed
  - Overall: 10/1000 (1.0%)
  - Avg time per transcript: 3.45s
  - Est. time remaining: 56.8 minutes
```

## Expected Results

- **Total Time**: 45-90 minutes (depending on API response times)
- **Total Cost**: ~$3-15 (depending on transcript length)
- **Output Files**: 1,000 transcript files across 3 directories

## Output Locations

Transcripts will be saved in:
- `transcript_factory/technical_support/` (700 files)
- `transcript_factory/billing_inquiry/` (150 files)
- `transcript_factory/account_management/` (150 files)

## Troubleshooting

### Error: "ANTHROPIC_API_KEY not found"
- Make sure you've set the environment variable
- Try restarting your terminal/command prompt after setting it

### Script Interrupted
- Don't worry! Files are saved as they're generated
- You can manually continue from where you left off by adjusting the script

### Want to test first?
Generate just a few transcripts to test:
```bash
python generate_transcripts.py --category technical_support --count 3
```

## Need Help?

See the full documentation in `transcript_factory/README.md`


# Outage Explorer - Test Checklist

## Pre-Testing Setup

- [ ] PostgreSQL database is running
- [ ] `DATABASE_URL` environment variable is set
- [ ] Anthropic API key obtained from https://console.anthropic.com/
- [ ] `.env.local` file created in `outage-dashboard-nextjs/` directory
- [ ] `ANTHROPIC_API_KEY` added to `.env.local`
- [ ] Development server restarted after adding environment variables

## Basic Functionality Tests

### Map Integration
- [ ] Dashboard loads without errors
- [ ] Map displays with outage markers (colored circles)
- [ ] Clicking on a marker shows a popup
- [ ] Popup displays ZIP code, city, call count, avg duration, and customer count
- [ ] "Explore outage" button is visible in the popup
- [ ] Button has proper styling (black background, white text)

### Outage Details Pane
- [ ] Clicking "Explore outage" opens the right-side pane
- [ ] Pane slides in smoothly from the right
- [ ] Pane header shows correct outage information (city, ZIP, call count)
- [ ] Close button (X) is visible in the top-right
- [ ] Clicking X closes the pane
- [ ] Pane is responsive (full-width on mobile, 600px on desktop)

### Transcript List
- [ ] Loading spinner appears while fetching transcripts
- [ ] Transcripts load and display in a list
- [ ] Each transcript item shows:
  - [ ] Call ID
  - [ ] Duration in minutes
  - [ ] Timestamp (formatted)
  - [ ] Customer location
- [ ] Clicking a transcript expands it
- [ ] Expanded view shows:
  - [ ] Customer ID
  - [ ] Full location
  - [ ] Complete transcript text
- [ ] Clicking again collapses the transcript
- [ ] Multiple transcripts can be expanded simultaneously
- [ ] List is scrollable if there are many transcripts

### Claude Chat Interface
- [ ] Chat section is visible at the bottom of the pane
- [ ] Chat section has fixed height (~350px)
- [ ] Input field is present and functional
- [ ] Send button is visible
- [ ] Placeholder text says "Ask a question..."

### Chat Functionality
- [ ] Typing in the input field works
- [ ] Send button is disabled when input is empty
- [ ] Pressing Enter sends the message
- [ ] User message appears in chat history (right-aligned, black background)
- [ ] Loading indicator appears while waiting for response
- [ ] Claude's response appears (left-aligned, gray background)
- [ ] Chat history is scrollable
- [ ] Chat auto-scrolls to newest message
- [ ] Multiple messages can be sent in sequence
- [ ] Conversation context is maintained

### Chat Content Quality
- [ ] Claude responds with relevant information about the transcripts
- [ ] Responses reference specific calls when appropriate
- [ ] Claude acknowledges when it doesn't have enough information
- [ ] Responses are coherent and well-formatted

## Edge Cases

### Error Handling
- [ ] If API key is missing, appropriate error message is shown
- [ ] If API key is invalid, error is handled gracefully
- [ ] If no transcripts exist for an outage, message is displayed
- [ ] Network errors are handled without crashing the app
- [ ] Long transcripts don't break the UI

### State Management
- [ ] Opening a different outage clears the previous chat history
- [ ] Opening a different outage loads new transcripts
- [ ] Closing and reopening the same outage resets the state
- [ ] Time range changes affect which transcripts are shown

### UI/UX
- [ ] All animations are smooth
- [ ] No layout shifts or jumps
- [ ] Text is readable and properly sized
- [ ] Buttons have hover states
- [ ] Loading states are clear
- [ ] No console errors in browser developer tools

## Performance Tests

- [ ] Pane opens quickly (< 1 second)
- [ ] Transcripts load in reasonable time (< 3 seconds)
- [ ] Chat responses arrive in reasonable time (< 5 seconds)
- [ ] UI remains responsive during loading
- [ ] Large transcript lists don't cause lag

## Sample Questions to Test

Try asking Claude these questions to verify it's working correctly:

1. "What are the most common issues reported in these calls?"
2. "How many calls mention router problems?"
3. "Summarize the main problems in bullet points"
4. "What time did most calls occur?"
5. "Are customers reporting similar symptoms?"
6. "What's the average call duration?"
7. "Are there any mentions of specific equipment failures?"
8. "What patterns do you see across these calls?"

## Expected Behavior

✅ **Good Response**: Claude analyzes the transcripts and provides specific, relevant answers
✅ **Good Response**: Claude cites call numbers or quotes from transcripts
✅ **Good Response**: Claude says "I don't see that information in these transcripts" when appropriate

❌ **Bad Response**: Claude makes up information not in the transcripts
❌ **Bad Response**: Claude gives generic answers without referencing the data
❌ **Bad Response**: Claude refuses to answer or gives errors

## Troubleshooting

If something doesn't work:

1. **Check browser console** for JavaScript errors
2. **Check server logs** for API errors
3. **Verify environment variables** are set correctly
4. **Check database connection** is working
5. **Verify API key** is valid in Anthropic console
6. **Try a different outage** to see if it's data-specific
7. **Clear browser cache** and reload
8. **Restart dev server** if environment variables were just added

## Sign-Off

Once all items are checked, the feature is ready for production use!

Date Tested: _______________
Tested By: _______________
Status: ⬜ Pass  ⬜ Fail  ⬜ Needs Fixes


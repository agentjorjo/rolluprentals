# Roll Up Rentals Chatbot Implementation

## Overview
This implementation adds a Telegram chatbot widget to the Roll Up Rentals website that provides:
1. Quick automated answers to common questions about dumpster rentals, storage containers, and mobile offices
2. Functionality to connect directly to Telegram for live chat with the support team
3. A floating chat widget that appears on all website pages

## Files Modified
- Added `/js/chatbot.js` - The main chatbot widget implementation
- Updated all HTML pages to include the chatbot script:
  - index.html
  - about.html
  - contact.html
  - dumpster-rentals.html
  - storage-containers.html
  - mobile-offices.html
  - service-locations.html

## Features
### Chatbot Widget
- Floating Telegram icon in bottom-right corner
- Click to expand/collapse chat window
- Pre-programmed responses to common questions
- Quick action buttons for frequent inquiries
- Direct input for custom questions
- Clean, modern UI that matches website styling

### Knowledge Base
The chatbot includes predefined responses for:
- **Dumpster Rentals**: Sizes, pricing, rental duration, accepted materials, permits, weight limits, delivery
- **Storage Containers**: Sizes, types, weatherproofing, customization, rental period, prohibited items, delivery/placement
- **Mobile Offices**: Definition, benefits, sizes, features, rental duration, setup, permits, ADA compliance, power requirements
- **General Information**: Business hours, service areas, contact information, payment methods, cancellation policy, insurance, reviews

### Telegram Integration
- Widget connects directly to Telegram for live chat
- Users can click the Telegram button or use the "Connect to Telegram" option
- Requires configuration with actual Telegram Bot details

## Setup Instructions
1. **Create a Telegram Bot** using BotFather on Telegram
2. **Get your Chat ID** by:
   - Starting a chat with your bot
   - Getting updates via: `https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates`
   - Finding the chat ID in the response
3. **Edit `/js/chatbot.js`** and replace:
   - `YOUR_TELEGRAM_CHAT_ID` with your actual chat ID
   - `RollUpRentalsBot` with your bot's username
4. **Test the implementation** by opening any website page and clicking the chat widget

## Customization
To modify the chatbot responses:
1. Edit the `FAQ_DATA` object in `/js/chatbot.js`
2. Add new categories or modify existing responses as needed
3. Adjust the quick question buttons in the `createChatWidget()` function

## Browser Compatibility
The chatbot widget works in all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Android Chrome)
- Degrades gracefully in older browsers (will still show basic Telegram link)

## Privacy & Security
- No user data is collected or stored by the widget
- All chat happens directly through Telegram
- No third-party tracking or analytics
- Lightweight implementation (<50KB JavaScript)
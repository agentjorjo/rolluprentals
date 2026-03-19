// Roll Up Rentals Chatbot Widget
// This script implements a Telegram chat widget for customer support

(function() {
    // Configuration - Replace these values with your actual Telegram bot/chat details
    const CHAT_ID = "YOUR_TELEGRAM_CHAT_ID"; // Replace with your actual chat ID
    const BOT_USERNAME = "RollUpRentalsBot"; // Replace with your bot's username
    
    // Chatbot knowledge base for common questions
    const FAQ_DATA = {
        "dumpster": {
            "sizes": "We offer dumpster rentals in various sizes: 10yd, 15yd, 20yd, 30yd, and 40yd roll-off dumpsters. For small projects like garage cleanouts or small renovations, our 10yd or 15yd dumpsters work well. For medium-sized projects like kitchen remodels or roofing, we recommend our 20yd or 30yd options. For large construction projects or major cleanouts, our 40yd dumpsters are ideal.",
            "pricing": "Dumpster rental costs vary based on size, rental period, type of debris, and delivery location. Generally, our prices range from $350-$800+ for most residential projects. Contact us for a specific quote based on your needs - we offer transparent pricing with no hidden fees.",
            "duration": "Standard rental periods are typically 7-14 days, but we offer flexible extensions for an additional daily fee if you need the dumpster longer. We understand projects can sometimes take unexpected turns!",
            "materials": "You can dispose of general household junk, construction debris, furniture, appliances, yard waste, and most non-hazardous materials in our dumpsters. Prohibited items include hazardous materials like paint, chemicals, batteries, asbestos, tires, oils, and flammable materials.",
            "permits": "If placing the dumpster on private property (like your driveway), no permit is usually needed. For public property (street or sidewalk), you'll need to obtain a permit from your local municipality. We can help guide you through this process if needed.",
            "weight": "Yes, all dumpsters have weight limits included in the rental price. Exceeding these limits results in additional fees per ton. We'll help you choose the right size to avoid overweight charges based on your project type.",
            "delivery": "We handle both delivery and pickup scheduling. In most cases, you don't need to be present for either delivery or pickup - just ensure the placement area is clear and accessible.",
            "placement": "Please ensure the placement area is clear and accessible. Our trucks need approximately 10-12 feet of width clearance for safe delivery and placement. The surface should be firm enough to support the weight of a loaded dumpster."
        },
        "storage": {
            "sizes": "Our storage containers come in standard sizes: 10-foot, 12-foot, 16-foot, 20-foot, and 40-foot lengths, all 8 feet wide. High cube options are available for extra vertical space (9.5 feet tall instead of standard 8.5 feet).",
            "types": "We offer standard dry cargo containers, refrigerated units for temperature-sensitive items, and specialized containers that can be converted into offices, workshops, or custom workspaces.",
            "weatherproof": "Yes, all our storage containers are made of corrosion-resistant steel and are fully weatherproof, water-tested to prevent leaks and keep contents dry and secure. They're rated for all weather conditions including rain, wind, and extreme temperatures.",
            "customization": "Containers can be customized with shelving, lighting, additional ventilation, custom doors, windows, insulation, electrical packages, and other modifications to suit your specific storage needs.",
            "duration": "Minimum rental period is typically one month, with flexible terms available - you can keep the container for as long as needed with monthly renewal options.",
            "prohibited": "For safety reasons, we prohibit storing flammable, toxic, or hazardous materials like gasoline, oil, paint, chemicals, and propane tanks. Perishable foods, live plants, and pets are also not recommended for storage in our containers.",
            "delivery": "Delivery typically takes 1-5 business days for in-stock units in the Los Angeles area. We require approximately 65 feet of straight clearance for 20-foot containers and 120 feet for 40-foot containers, plus 10 feet width and 14 feet overhead clearance.",
            "placement": "Containers should be placed on firm, dry, and level ground such as pavement, gravel, concrete, or hard dirt. We recommend using wood or plastic blocks under the corners to prevent sinking into soft surfaces."
        },
        "mobile_office": {
            "definition": "A mobile office is a portable, self-contained workspace that provides traditional office amenities in a relocatable structure. Perfect for construction sites, temporary projects, disaster relief, or businesses needing flexible workspace solutions.",
            "benefits": "Mobile offices offer flexibility, cost-effectiveness, and quick deployment. They're more affordable than traditional construction, can be deployed rapidly (often within days), and provide a professional work environment wherever you need it.",
            "sizes": "Available in various sizes from single-room trailers to multi-room complexes, commonly in 10, 20, and 40-foot lengths with 8-foot width. Custom configurations available upon request.",
            "features": "Standard features include HVAC (heating and air conditioning), plumbing, electrical systems, windows, doors, roofing, insulation, and vinyl siding. Custom options include security enhancements, decking, ramps, stairs, interior furnishings, and technology packages.",
            "duration": "Rental contracts range from month-to-month to multi-year terms. Renting is cost-effective for needs under 24 months; purchasing may be better for longer-term use. We offer flexible terms to match your project timeline.",
            "setup": "Basic site preparation is needed - ensuring the area is flat, dry, and free of debris. Delivery typically takes 3-7 business days in the Los Angeles area, though expedited options may be available for urgent needs.",
            "permits": "In most areas, mobile offices are considered temporary structures and don't require permits for short-term use. However, requirements vary by location and duration, especially in urban or residential areas. We can help determine what's needed for your specific situation.",
            "ada": "Larger mobile office units (20ft and 40ft) can be made ADA compliant with proper ramps, wider doors, and accessible bathrooms. Smaller units may have limitations for handicap-accessible facilities.",
            "power": "Each unit includes its own electrical subpanel, typically ranging from 60-100 amps for smaller trailers to up to 200 amps for larger units. Phone/data lines need to be installed by your service provider, but we provide the infrastructure."
        },
        "general": {
            "hours": "Our business hours are Monday-Friday, 6:00 AM to 6:00 PM PST. We offer limited weekend service and emergency after-hours service for urgent situations.",
            "service_area": "We proudly serve all cities and communities within approximately 120 miles of Downtown Los Angeles, covering Los Angeles, Orange, Ventura, Riverside, San Bernardino, Santa Barbara, and Kern counties.",
            "contact": "You can reach us at 1-800-RAPID-WASTE (1-800-727-4392) or email info@rolluprentals.com. For fastest service, use our Telegram chat widget!",
            "payment": "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and cash payments. Payment terms vary by service type - some require payment at booking, others upon completion or delivery.",
            "cancellation": "Cancellation policies vary by service and timing. We recommend contacting us as soon as possible if you need to modify or cancel a reservation to discuss any potential fees. Weather-related cancellations are typically more flexible.",
            "insurance": "Yes, we are fully licensed and insured for your protection. Our coverage includes liability insurance, cargo insurance, and workers' compensation where applicable.",
            "reviews": "We maintain a 5-star rating throughout the Los Angeles area. Customer satisfaction is our top priority, and we stand behind all our equipment and services with our satisfaction guarantee."
        }
    };

    // Create the chatbot widget elements
    function createChatWidget() {
        // Create container
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'rul-chat-widget';
        widgetContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            z-index: 1000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;
        
        // Create chat button
        const chatButton = document.createElement('div');
        chatButton.id = 'rul-chat-button';
        chatButton.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #1e3a8a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            border: none;
        `;
        
        // Create Telegram icon (using text for simplicity)
        const telegramIcon = document.createElement('div');
        telegramIcon.innerHTML = '💬';
        telegramIcon.style.cssText = `
            font-size: 28px;
            line-height: 1;
        `;
        
        chatButton.appendChild(telegramIcon);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.id = 'rul-chat-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            right: 50%;
            transform: translateX(50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            margin-bottom: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
        `;
        tooltip.textContent = 'Chat with us on Telegram';
        
        // Create chat window (hidden by default)
        const chatWindow = document.createElement('div');
        chatWindow.id = 'rul-chat-window';
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            z-index: 1001;
            overflow: hidden;
            border: 1px solid #e0e0e0;
        `;
        
        // Chat window header
        const chatHeader = document.createElement('div');
        chatHeader.style.cssText = `
            background-color: #1e3a8a;
            color: white;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e0e0e0;
        `;
        
        const chatTitle = document.createElement('h3');
        chatTitle.style.cssText = `
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        `;
        chatTitle.textContent = 'Roll Up Rentals Support';
        
        const chatCloseBtn = document.createElement('button');
        chatCloseBtn.innerHTML = '×';
        chatCloseBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        chatHeader.appendChild(chatTitle);
        chatHeader.appendChild(chatCloseBtn);
        
        // Chat window body
        const chatBody = document.createElement('div');
        chatBody.id = 'rul-chat-body';
        chatBody.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;
        
        // Welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            background-color: #eff6ff;
            padding: 12px 16px;
            border-radius: 8px;
            border-left: 4px solid #1e3a8a;
            font-size: 14px;
            line-height: 1.5;
        `;
        welcomeMessage.innerHTML = `
            <strong>Hello! 👋</strong><br>
            I'm the Roll Up Rentals chatbot. I can help answer your questions about:<br>
            • Dumpster Rentals<br>
            • Storage Containers<br>
            • Mobile Offices<br>
            <br>
            For immediate assistance, you can also connect directly to our team via Telegram!
        `;
        
        chatBody.appendChild(welcomeMessage);
        
        // Quick question buttons
        const quickQuestions = document.createElement('div');
        quickQuestions.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        `;
        
        const questionTopics = [
            { text: 'Dumpster Sizes', category: 'dumpster', key: 'sizes' },
            { text: 'Storage Options', category: 'storage', key: 'sizes' },
            { text: 'Mobile Office Features', category: 'mobile_office', key: 'features' },
            { text: 'Pricing Info', category: 'dumpster', key: 'pricing' },
            { text: 'Service Areas', category: 'general', key: 'service_area' },
            { text: 'Rental Periods', category: 'dumpster', key: 'duration' }
        ];
        
        questionTopics.forEach(q => {
            const btn = document.createElement('button');
            btn.textContent = q.text;
            btn.style.cssText = `
                background-color: #f8f9fa;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 8px 12px;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1 1 calc(33.333% - 8px);
                min-width: 80px;
            `;
            
            btn.addEventListener('click', () => {
                addMessage(q.category, q.key, true); // true = from bot
            });
            
            quickQuestions.appendChild(btn);
        });
        
        // Chat input area
        const chatInputArea = document.createElement('div');
        chatInputArea.style.cssText = `
            display: flex;
            padding: 16px;
            border-top: 1px solid #e0e0e0;
            background-color: #fafafa;
        `;
        
        const chatInput = document.createElement('input');
        chatInput.type = 'text';
        chatInput.placeholder = 'Type your message...';
        chatInput.style.cssText = `
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
        `;
        
        const sendButton = document.createElement('button');
        sendButton.innerHTML = '→';
        sendButton.style.cssText = `
            margin-left: 12px;
            background-color: #1e3a8a;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
        `;
        
        // Handle sending message
        function handleSendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage('user', message, false); // false = from user
                chatInput.value = '';
                
                // Simulate bot thinking
                setTimeout(() => {
                    const response = generateBotResponse(message);
                    addMessage('bot', response, true);
                }, 800);
            }
        }
        
        sendButton.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
        
        chatInputArea.appendChild(chatInput);
        chatInputArea.appendChild(sendButton);
        
        // Assemble chat window
        chatWindow.appendChild(chatHeader);
        chatWindow.appendChild(chatBody);
        chatWindow.appendChild(chatInputArea);
        
        // Assemble widget
        widgetContainer.appendChild(chatButton);
        widgetContainer.appendChild(tooltip);
        widgetContainer.appendChild(chatWindow);
        
        // Add to document
        document.body.appendChild(widgetContainer);
        
        // Add event listeners
        chatButton.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        
        chatButton.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
        
        chatButton.addEventListener('click', () => {
            const isOpen = chatWindow.style.display === 'flex';
            chatWindow.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                chatInput.focus();
            }
        });
        
        chatCloseBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
        
        // Handle clicks outside chat window
        document.addEventListener('click', (e) => {
            if (!widgetContainer.contains(e.target) && chatWindow.style.display === 'flex') {
                chatWindow.style.display = 'none';
            }
        });
    }
    
    // Add a message to the chat
    function addMessage(sender, content, isBotResponse = false) {
        const chatBody = document.getElementById('rul-chat-body');
        if (!chatBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            display: flex;
            margin-bottom: 8px;
            max-width: 80%;
        `;
        
        if (sender === 'user') {
            messageDiv.style.justifyContent = 'flex-end';
            messageDiv.innerHTML = `
                <div style="
                    background-color: #1e3a8a;
                    color: white;
                    padding: 10px 14px;
                    border-radius: 18px 18px 4px 18px;
                    font-size: 14px;
                    line-height: 1.4;
                ">
                    ${escapeHtml(content)}
                </div>
            `;
        } else {
            messageDiv.style.justifyContent = 'flex-start';
            messageDiv.innerHTML = `
                <div style="
                    display: flex;
                    align-items: flex-start;
                ">
                    <div style="
                        background-color: #f0f0f0;
                        border-radius: 50%;
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 10px;
                        flex-shrink: 0;
                    ">
                        🤖
                    </div>
                    <div style="
                        background-color: #f0f0f0;
                        color: #333;
                        padding: 10px 14px;
                        border-radius: 18px 18px 18px 4px;
                        font-size: 14px;
                        line-height: 1.4;
                    ">
                        ${escapeHtml(content)}
                    </div>
                </div>
            `;
        }
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Generate bot response based on user message
    function generateBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check for specific topics
        if (lowerMsg.includes('dumpster') || lowerMsg.includes('dumpster rental')) {
            if (lowerMsg.includes('size') || lowerMsg.includes('what size')) {
                return FAQ_DATA.dumpster.sizes;
            } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
                return FAQ_DATA.dumpster.pricing;
            } else if (lowerMsg.includes('how long') || lowerMsg.includes('duration')) {
                return FAQ_DATA.dumpster.duration;
            } else if (lowerMsg.includes('material') || lowerMsg.includes('what can')) {
                return FAQ_DATA.dumpster.materials;
            } else if (lowerMsg.includes('permit')) {
                return FAQ_DATA.dumpster.permits;
            } else if (lowerMsg.includes('weight')) {
                return FAQ_DATA.dumpster.weight;
            } else if (lowerMsg.includes('delivery')) {
                return FAQ_DATA.dumpster.delivery;
            } else {
                return FAQ_DATA.dumpster.sizes + "\n\n" + FAQ_DATA.dumpster.pricing;
            }
        } else if (lowerMsg.includes('storage') || lowerMsg.includes('container')) {
            if (lowerMsg.includes('size') || lowerMsg.includes('what size')) {
                return FAQ_DATA.storage.sizes;
            } else if (lowerMsg.includes('type') || lowerMsg.includes('kind')) {
                return FAQ_DATA.storage.types;
            } else if (lowerMsg.includes('weather') || lowerMsg.includes('waterproof')) {
                return FAQ_DATA.storage.weatherproof;
            } else if (lowerMsg.includes('custom')) {
                return FAQ_DATA.storage.customization;
            } else if (lowerMsg.includes('how long') || lowerMsg.includes('duration')) {
                return FAQ_DATA.storage.duration;
            } else if (lowerMsg.includes('prohibited') || lowerMsg.includes('cannot')) {
                return FAQ_DATA.storage.prohibited;
            } else if (lowerMsg.includes('delivery')) {
                return FAQ_DATA.storage.delivery;
            } else if (lowerMsg.includes('placement')) {
                return FAQ_DATA.storage.placement;
            } else {
                return FAQ_DATA.storage.sizes + "\n\n" + FAQ_DATA.storage.types;
            }
        } else if (lowerMsg.includes('mobile office') || lowerMsg.includes('mobile office')) {
            if (lowerMsg.includes('what') || lowerMsg.includes('define')) {
                return FAQ_DATA.mobile_office.definition;
            } else if (lowerMsg.includes('benefit') || lowerMsg.includes('advantage')) {
                return FAQ_DATA.mobile_office.benefits;
            } else if (lowerMsg.includes('size') || lowerMsg.includes('what size')) {
                return FAQ_DATA.mobile_office.sizes;
            } else if (lowerMsg.includes('feature') || lowerMsg.includes('amenity')) {
                return FAQ_DATA.mobile_office.features;
            } else if (lowerMsg.includes('how long') || lowerMsg.includes('duration')) {
                return FAQ_DATA.mobile_office.duration;
            } else if (lowerMsg.includes('setup') || lowerMsg.includes('delivery')) {
                return FAQ_DATA.mobile_office.setup;
            } else if (lowerMsg.includes('permit')) {
                return FAQ_DATA.mobile_office.permits;
            } else if (lowerMsg.includes('ada')) {
                return FAQ_DATA.mobile_office.ada;
            } else if (lowerMsg.includes('power') || lowerMsg.includes('electric')) {
                return FAQ_DATA.mobile_office.power;
            } else {
                return FAQ_DATA.mobile_office.definition + "\n\n" + FAQ_DATA.mobile_office.benefits;
            }
        } else if (lowerMsg.includes('hour') || lowerMsg.includes('time') || lowerMsg.includes('open')) {
            return FAQ_DATA.general.hours;
        } else if (lowerMsg.includes('area') || lowerMsg.includes('location') || lowerMsg.includes('serve')) {
            return FAQ_DATA.general.service_area;
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
            return FAQ_DATA.general.contact;
        } else if (lowerMsg.includes('payment') || lowerMsg.includes('pay')) {
            return FAQ_DATA.general.payment;
        } else if (lowerMsg.includes('cancel') || lowerMsg.includes('refund')) {
            return FAQ_DATA.general.cancellation;
        } else if (lowerMsg.includes('insurance') || lowerMsg.includes('licensed')) {
            return FAQ_DATA.general.insurance;
        } else if (lowerMsg.includes('review') || lowerMsg.includes('rating')) {
            return FAQ_DATA.general.reviews;
        } else {
            // Default response
            return `Hello! I'm here to help you with questions about our dumpster rentals, storage containers, and mobile offices. 

You can ask me about:
• Dumpster sizes, pricing, and rental terms
• Storage container options and features  
• Mobile office specifications and benefits

For immediate assistance with urgent matters or to speak directly with our team, you can connect with us on Telegram or call us at 1-800-RAPID-WASTE.

What specific question do you have today?`;
        }
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    // Initialize the widget when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createChatWidget);
    } else {
        createChatWidget();
    }
})();
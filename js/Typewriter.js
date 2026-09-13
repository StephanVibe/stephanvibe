/**
 * Erstellt einen Typewriter-Effekt für ein bestimmtes Element.
 * 
 * @param {HTMLElement|string} target - Das HTML-Element oder dessen ID.
 * @param {string|string[]} textInput - Ein einzelner String oder ein Array aus Strings.
 * @param {Object} [options] - Optionale Konfigurationen.
 * @param {number} [options.speed=40] - Tipp-Geschwindigkeit in ms pro Zeichen.
 * @param {number} [options.pause=500] - Pause in ms zwischen mehreren Texten.
 * @param {boolean} [options.loop=false] - Ob die Animation endlos wiederholt werden soll.
 * @param {Function} [options.onComplete=null] - Callback-Funktion, wenn das Tippen beendet ist.
 */
export function createTypewriter(target, textInput, options = {}) {
    const element = typeof target === 'string' ? document.getElementById(target) : target;
    if (!element) {
        console.error(`Typewriter: Element '${target}' wurde nicht gefunden.`);
        return;
    }

    const messages = Array.isArray(textInput) ? textInput : [textInput];
    const speed = options.speed ?? 40;
    const pauseTime = options.pause ?? 500;
    const loop = options.loop ?? false;
    const onComplete = options.onComplete ?? null;

    let msgIndex = 0;
    let charIndex = 0;
    let isRunning = false;
    let timeoutId = null;

    function step() {
        if (!isRunning || messages.length === 0) return;

        const currentMessage = messages[msgIndex];
        element.innerText = currentMessage.substring(0, charIndex);
        charIndex++;

        if (charIndex <= currentMessage.length) {
            timeoutId = setTimeout(step, speed);
        } else {
            msgIndex++;
            charIndex = 0;

            if (msgIndex >= messages.length) {
                if (!loop) {
                    isRunning = false;
                    if (onComplete) onComplete();
                    return;
                }
                msgIndex = 0;
            }

            timeoutId = setTimeout(step, pauseTime);
        }
    }

    return {
        start() {
            if (isRunning) return;
            isRunning = true;
            step();
        },
        stop() {
            isRunning = false;
            clearTimeout(timeoutId);
        },
        reset() {
            this.stop();
            msgIndex = 0;
            charIndex = 0;
            element.innerText = '';
        }
    };
}

import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
    return (
        <section style={styles.section}>
            <div style={styles.glow} />
            <div className="container" style={styles.container}>
                <div className="animate-fade-in" style={styles.content}>
                    <img src="/logo.png" alt="Mnemix Logo" style={styles.heroLogo} />

                    <h1 style={styles.headline}>
                        The Local Memory Engine <br />
                        for <span className="text-gradient">AI Agents</span>
                    </h1>

                    <p style={styles.subtext}>
                        Mnemix gives your agent a structured, local memory store that persists between sessions. Inspect, search, and time-travel with zero cloud dependencies.
                    </p>

                    <div style={styles.actions}>
                        <a href="#quickstart" className="btn btn-primary">
                            Get Started <ArrowRight size={18} />
                        </a>
                        <a href="https://github.com/micahcourey/mnemix" target="_blank" rel="noreferrer" className="btn btn-secondary">
                            <Terminal size={18} /> pip install mnemix
                        </a>
                    </div>
                </div>

                <div className="animate-fade-in delay-200" style={styles.visualContainer}>
                    <div className="glass-card" style={styles.codeWindow}>
                        <div style={styles.windowHeader}>
                            <div style={styles.windowDots}>
                                <span style={{ ...styles.dot, backgroundColor: '#ef4444' }}></span>
                                <span style={{ ...styles.dot, backgroundColor: '#f59e0b' }}></span>
                                <span style={{ ...styles.dot, backgroundColor: '#10b981' }}></span>
                            </div>
                            <div style={styles.windowTab}>mnemix-cli — session</div>
                        </div>
                        <pre className="mono" style={styles.pre}>
                            <span style={styles.cmd}>$ mnemix --store .mnemix search --text "storage decision"</span>
                            <br />
                            <span style={styles.comment}># Results from agent memory:</span>
                            <span style={styles.keyword}>id</span>: mem-001 <span style={styles.keyword}>| kind</span>: decision <span style={styles.keyword}>| importance</span>: 80
                            <span style={styles.string}>Title</span>: Use LanceDB for local storage
                            <span style={styles.string}>Summary</span>: LanceDB chosen for Arrow-native embedded storage with FTS and versioning.
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        position: 'relative' as const,
        paddingTop: '160px',
        paddingBottom: '100px',
        overflow: 'hidden',
    },
    glow: {
        position: 'absolute' as const,
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, rgba(10, 10, 10, 0) 70%)',
        zIndex: -1,
        pointerEvents: 'none' as const,
    },
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        textAlign: 'center' as const,
        gap: '4rem',
    },
    content: {
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '1.5rem',
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 1rem',
        borderRadius: '9999px',
        background: 'var(--color-bg-surface-elevated)',
        border: '1px solid var(--color-border)',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: 'var(--color-primary)',
        marginBottom: '1rem',
    },
    badgeDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
    },
    heroLogo: {
        width: '160px',
        height: '160px',
        marginBottom: '1rem',
        filter: 'drop-shadow(0 0 40px rgba(20, 184, 166, 0.4))',
    },
    headline: {
        marginBottom: '0.5rem',
    },
    subtext: {
        fontSize: '1.25rem',
        color: 'var(--color-text-muted)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
    },
    visualContainer: {
        width: '100%',
        maxWidth: '900px',
        perspective: '1000px',
    },
    codeWindow: {
        padding: 0,
        overflow: 'hidden',
        transform: 'rotateX(5deg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(20, 184, 166, 0.1)',
    },
    windowHeader: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    windowDots: {
        display: 'flex',
        gap: '0.4rem',
    },
    dot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    windowTab: {
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-sans)',
    },
    pre: {
        padding: '1.5rem',
        margin: 0,
        fontSize: '0.95rem',
        lineHeight: 1.5,
        overflowX: 'auto' as const,
        textAlign: 'left' as const,
    },
    cmd: { color: 'var(--color-primary)' },
    comment: { color: 'var(--color-text-subtle)' },
    keyword: { color: 'var(--color-secondary)' },
    string: { color: '#eab308' },
};

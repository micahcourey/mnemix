import { Blocks, ExternalLink, Sparkles } from 'lucide-react';

export default function Ecosystem() {
    return (
        <section id="ecosystem" style={styles.section}>
            <div className="container" style={styles.container}>
                <div className="glass-card ecosystem-card">
                    <div style={styles.copy}>
                        <div style={styles.eyebrow}>
                            <Sparkles size={16} />
                            Ecosystem
                        </div>
                        <h2 style={styles.title}>
                            A growing <span className="text-gradient">ecosystem</span> of tools
                        </h2>
                        <p style={styles.body}>
                            Mnemix is the core memory engine, but it's most powerful when paired with the companion tools designed to expand its reach across your entire development lifecycle.
                        </p>
                    </div>

                    <div style={styles.grid}>
                        <div className="glass-card ecosystem-subcard">
                            <div style={styles.cardHeader}>
                                <div style={styles.metaBadge}>Context Generator</div>
                                <h3 style={styles.cardTitle}>mnemix-context</h3>
                            </div>
                            <p style={styles.cardBody}>
                                For config-driven, multi-platform generation of AI coding resources. It generates pre-configured agent personas, auto-activating skills, and platform adapters tailored to your entire repository.
                            </p>
                            <div style={styles.featureList}>
                                <div style={styles.featureItem}>• Supports Copilot, Cursor, Claude Code, and more</div>
                                <div style={styles.featureItem}>• Parses codebase schema and architecture</div>
                            </div>
                            <a
                                href="https://github.com/micahcourey/mnemix-context"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={styles.button}
                            >
                                <Blocks size={18} />
                                Explore Context
                                <ExternalLink size={16} />
                            </a>
                        </div>

                        <div className="glass-card ecosystem-subcard">
                            <div style={styles.cardHeader}>
                                <div style={styles.metaBadge}>Planning Companion</div>
                                <h3 style={styles.cardTitle}>mnemix-workflow</h3>
                            </div>
                            <p style={styles.cardBody}>
                                A repo-native planning companion for AI-assisted engineering. Manage workstreams, lightweight patches, and terminal-first planning with tracked execution directly in your repository.
                            </p>
                            <div style={styles.featureList}>
                                <div style={styles.featureItem}>• Methodology-first workstreams and patches</div>
                                <div style={styles.featureItem}>• Terminal UI for browsing planning history</div>
                            </div>
                            <a
                                href="https://github.com/micahcourey/mnemix-workflow"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={styles.button}
                            >
                                <Blocks size={18} />
                                Explore Workflow
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: '2rem 0 8rem',
    },
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    copy: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
        maxWidth: '800px',
    },
    eyebrow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-primary)',
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
    },
    title: {
        marginBottom: '0.25rem',
    },
    body: {
        color: 'var(--color-text-muted)',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        maxWidth: '56ch',
    },
    link: {
        color: 'var(--color-primary)',
        textDecoration: 'none',
    },
    button: {
        marginTop: 'auto',
        width: 'fit-content',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
    },
    cardHeader: {
        marginBottom: '1rem',
    },
    cardTitle: {
        fontSize: '1.25rem',
        margin: '0.25rem 0',
    },
    cardBody: {
        color: 'var(--color-text-muted)',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
    },
    featureList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
        marginBottom: '1.5rem',
    },
    featureItem: {
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
    },
    metaBadge: {
        color: 'var(--color-primary)',
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
    },
};

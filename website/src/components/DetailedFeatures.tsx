import { Hexagon, Database, History, Search, Zap, ShieldCheck } from 'lucide-react';

export default function DetailedFeatures() {
    const features = [
        {
            icon: <Database size={48} className="text-primary" />,
            title: "Local-First Persistence",
            subtitle: "Built on LanceDB for lightning-fast, embedded vector storage.",
            description: "Mnemix leverages the power of LanceDB and Apache Arrow to provide a high-performance memory backend that runs entirely in-process. This architecture eliminates the latency and privacy concerns of cloud-based vector databases while offering enterprise-grade search capabilities.",
            visual: "storage"
        },
        {
            icon: <History size={48} className="text-secondary" />,
            title: "Immutable Version History",
            subtitle: "Audit every thought and action with absolute precision.",
            description: "Every memory write operation in Mnemix creates an immutable version of the store. This 'Time-Travel' capability allows you to inspect the agent's state at any historical point, roll back mistakes, and perform A/B testing on different agent reasoning paths.",
            visual: "history"
        },
        {
            icon: <ShieldCheck size={48} className="text-primary" />,
            title: "Strict Privacy & Isolation",
            description: "Security is built into the core. Mnemix enforces workspace siloing at the file level, ensuring that memories from one project or client never leak into another. Since it's local-first, sensitive data never leaves your infrastructure.",
            visual: "security"
        },
        {
            icon: <Zap size={48} className="text-secondary" />,
            title: "Progressive Context Layers",
            description: "Avoid 'context flooding' that confuses LLMs. Mnemix uses a layered retrieval strategy: Pinned memories for immediate facts, Summaries for broad context, and Archival search for deep retrieval. Your agents find exactly what they need, exactly when they need it.",
            visual: "layers"
        },
        {
            icon: <Search size={48} className="text-primary" />,
            title: "Hybrid Search Heuristics",
            description: "Combine the best of both worlds. Mnemix merges semantic vector search with traditional full-text keywords and metadata filters. Our smart ranking heuristics incorporate importance scores and temporal relevance to surface the most contextually significant data first.",
            visual: "search"
        },
        {
            icon: <Hexagon size={48} className="text-secondary" />,
            title: "Typed Knowledge Graphs",
            description: "Memory isn't just text—it's knowledge. Categorize agent memories by kind: Observations, Explicit Decisions, Procedures, Facts, and Warnings. This semantic typing allows agents to reason more effectively about the information they retrieve.",
            visual: "typed"
        }
    ];

    return (
        <section id="deep-dive" style={styles.section}>
            <div className="container">
                <div style={styles.header}>
                    <h2 style={styles.sectionTitle}>Engineered for <span className="text-gradient">Production Agents</span></h2>
                    <p style={styles.sectionSubtitle}>
                        A deep dive into the architecture that makes Mnemix the most reliable memory backend for AI agents.
                    </p>
                </div>

                <div style={styles.rowsContainer}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.row,
                                flexDirection: (index % 2 === 1 ? 'row-reverse' : 'row') as any
                            }}
                            className="detailed-feature-row"
                        >
                            <div style={styles.textContent}>
                                <div style={styles.iconBox}>{feature.icon}</div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                {feature.subtitle && <h4 style={styles.featureSubtitle}>{feature.subtitle}</h4>}
                                <p style={styles.featureDesc}>{feature.description}</p>
                            </div>

                            <div style={styles.visualContent}>
                                <div className="glass-card visual-placeholder animate-fade-in" style={styles.visualCard}>
                                    <div style={styles.visualGlow} />
                                    {/* Mock Visual Representation */}
                                    <div style={styles.visualInner}>
                                        <div style={styles.visualLabel}>{feature.visual.toUpperCase()} ENGINE</div>
                                        <div style={styles.visualPulse} className="pulse-glow" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: '120px 0',
        backgroundColor: 'var(--color-bg-base)',
        borderTop: '1px solid var(--color-border)',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '100px',
    },
    sectionTitle: {
        fontSize: '3rem',
        marginBottom: '1.5rem',
    },
    sectionSubtitle: {
        fontSize: '1.25rem',
        color: 'var(--color-text-muted)',
        maxWidth: '800px',
        margin: '0 auto',
    },
    rowsContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '120px',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '4rem',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
    },
    iconBox: {
        width: '80px',
        height: '80px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    featureTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        margin: 0,
    },
    featureSubtitle: {
        fontSize: '1.2rem',
        color: 'var(--color-primary)',
        fontWeight: 500,
        margin: '-0.5rem 0 0 0',
    },
    featureDesc: {
        fontSize: '1.1rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.8,
        margin: 0,
    },
    visualContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    visualCard: {
        width: '100%',
        maxWidth: '500px',
        height: '320px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as const,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
    },
    visualGlow: {
        position: 'absolute' as const,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
    },
    visualInner: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '1rem',
        zIndex: 1,
    },
    visualLabel: {
        fontFamily: 'var(--font-cyber)',
        fontSize: '0.9rem',
        letterSpacing: '0.2em',
        color: 'var(--color-text-subtle)',
    },
    visualPulse: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '2px solid var(--color-primary)',
    }
};

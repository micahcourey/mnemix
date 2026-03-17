import { useState } from 'react';
import { Terminal, Copy, Database, ArrowRight, Layers, Lock } from 'lucide-react';

const features = [
    {
        id: "storage",
        tab: "Storage",
        title: "Local-First Persistence",
        description: "Mnemix leverages LanceDB and Apache Arrow for a lean, embedded memory store that runs entirely on your local filesystem. No cloud clusters, no managed latency—just raw speed.",
        type: "diagram",
        diagram: "storage"
    },
    {
        id: "search",
        tab: "Search",
        title: "Semantic Global Search",
        description: "Combine vector search with traditional SQL-like metadata filtering. Surface exactly what your agent needs from gigabytes of historical context in milliseconds.",
        type: "code",
        code: `# Hybrid Search: Vector + Metadata filters
results = client.search(
    "How did we resolve the CORS issue?",
    kind="decision",
    limit=3
)

# Output format
[
  {"text": "Refactored origin headers...", "score": 0.98},
  {"text": "Added CORS middleware...", "score": 0.85}
]`
    },
    {
        id: "versioning",
        tab: "Versioning",
        title: "Immutable History",
        description: "Every write is a discrete, immutable version. Mnemix allows you to browse the full timeline of an agent's reasoning and restore the state to any prior checkpoint.",
        type: "code",
        code: `# Inspect the thought timeline
history = client.history()
print(f"Current version: {history[0].version_id}")

# Time-travel to a previous state
client.restore(version_id="v_prev_992")
print("Memory state restored to checkpoint.")`
    },
    {
        id: "context",
        tab: "Context",
        title: "Progressive Context Layers",
        description: "Avoid flooding the LLM context window. Mnemix layers retrieval into Pinned, Summary, and Archival tiers to maintain high reasoning quality with lower token costs.",
        type: "diagram",
        diagram: "layers"
    },
    {
        id: "types",
        tab: "Typed Memory",
        title: "Typed Knowledge Graph",
        description: "Memories aren't just strings. Categorize knowledge as Observations, Decisions, Facts, or Warnings to help your agent differentiate between noise and signal.",
        type: "code",
        code: `# Store a structured decision
client.remember(
    title="Primary DB Choice",
    summary="Using LanceDB for local-first speed",
    kind="decision",
    importance=90
)

# Recall only procedures
tasks = client.recall(kind="procedure")`
    }
];

export default function DetailedFeatures() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const activeFeature = features[activeTab];

    return (
        <section id="deep-dive" style={styles.section}>
            <div className="container">
                <div style={styles.header}>
                    <h2 style={styles.sectionTitle}>Engineered for <span className="text-gradient">Production Agents</span></h2>
                </div>

                <div className="tab-navigation" style={styles.tabsRow}>
                    {features.map((f, i) => (
                        <button
                            key={f.id}
                            onClick={() => handleTabClick(i)}
                            style={{
                                ...styles.tabBtn,
                                border: i === activeTab ? '1px solid var(--color-primary)' : '1px solid transparent',
                                backgroundColor: i === activeTab ? 'rgba(20, 184, 166, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                color: i === activeTab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            }}
                        >
                            {f.tab}
                        </button>
                    ))}
                </div>

                <div className="content-row" style={styles.contentRow}>
                    <div className="text-col" style={styles.textCol}>
                        <div key={activeFeature.id} className="animate-fade-in">
                            <h2 style={styles.title}>{activeFeature.title}</h2>
                            <p style={styles.description}>{activeFeature.description}</p>
                        </div>
                    </div>

                    <div className="visual-col" style={styles.visualCol}>
                        {activeFeature.type === 'code' ? (
                            <div className="glass-card" style={styles.codeWindow}>
                                <div style={styles.windowHeader}>
                                    <div style={styles.dots}>
                                        <div style={{ ...styles.dot, backgroundColor: '#ff5f56' }}></div>
                                        <div style={{ ...styles.dot, backgroundColor: '#ffbd2e' }}></div>
                                        <div style={{ ...styles.dot, backgroundColor: '#27c93f' }}></div>
                                    </div>
                                    <div style={styles.windowTitle}>
                                        <Terminal size={14} /> mnemix_agent.py
                                    </div>
                                    <div style={styles.copyBtn}><Copy size={14} /></div>
                                </div>
                                <div style={styles.codeArea}>
                                    <pre style={styles.pre}>
                                        <code style={styles.codeText}>{activeFeature.code}</code>
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card" style={styles.diagramWindow}>
                                {activeFeature.diagram === 'storage' && (
                                    <div style={styles.storageDiagram}>
                                        <div style={styles.diagramNode}>
                                            <Terminal size={24} className="text-primary" />
                                            <span style={styles.nodeLabel}>Your Agent</span>
                                        </div>
                                        <ArrowRight size={24} className="text-muted" />
                                        <div style={styles.diagramNode}>
                                            <div style={styles.pulseDisk} className="pulse-glow">
                                                <Database size={32} />
                                            </div>
                                            <span style={styles.nodeLabel}>LanceDB (local)</span>
                                        </div>
                                        <ArrowRight size={24} className="text-muted" />
                                        <div style={styles.diagramNode}>
                                            <div style={styles.arrowTable}>
                                                <div style={styles.tableRow}></div>
                                                <div style={styles.tableRow}></div>
                                                <div style={styles.tableRow}></div>
                                            </div>
                                            <span style={styles.nodeLabel}>Apache Arrow</span>
                                        </div>
                                    </div>
                                )}
                                {activeFeature.diagram === 'layers' && (
                                    <div style={styles.layersDiagram}>
                                        <div style={styles.layerCard} className="glass-card">
                                            <Lock size={16} className="text-primary" />
                                            <span>Pinned Context</span>
                                        </div>
                                        <div style={{ ...styles.layerCard, opacity: 0.8 }} className="glass-card">
                                            <Layers size={16} className="text-secondary" />
                                            <span>Summary Layer</span>
                                        </div>
                                        <div style={{ ...styles.layerCard, opacity: 0.6 }} className="glass-card">
                                            <Database size={16} className="text-muted" />
                                            <span>Archival Store</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: '100px 0',
        backgroundColor: 'var(--color-bg-base)',
        borderTop: '1px solid var(--color-border)',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '60px',
    },
    sectionTitle: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    tabsRow: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '60px',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
    },
    tabBtn: {
        padding: '0.75rem 2.5rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '140px',
        fontFamily: 'var(--font-sans)',
    },
    contentRow: {
        display: 'flex',
        gap: '4rem',
        alignItems: 'center',
        minHeight: '400px',
    },
    textCol: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
        textAlign: 'left' as const,
    },
    title: {
        fontSize: '2.5rem',
        lineHeight: 1.2,
        margin: 0,
    },
    description: {
        fontSize: '1.1rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
        margin: 0,
    },
    progressContainer: {
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--color-border)',
        marginTop: '2rem',
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'var(--color-primary)',
        transition: 'width 0.05s linear',
    },
    visualCol: {
        flex: 1.2,
    },
    codeWindow: {
        padding: 0,
        background: '#0d1117',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    },
    diagramWindow: {
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
    },
    windowHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    dots: {
        display: 'flex',
        gap: '6px',
        marginRight: '1rem',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
    },
    windowTitle: {
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flex: 1,
        justifyContent: 'center',
    },
    copyBtn: {
        color: 'var(--color-text-subtle)',
        cursor: 'pointer',
    },
    codeArea: {
        padding: '1.5rem',
        maxHeight: '350px',
        overflowY: 'auto' as const,
        textAlign: 'left' as const,
    },
    pre: {
        margin: 0,
    },
    codeText: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95rem',
        color: '#e6edf3',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap' as const,
    },
    storageDiagram: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    diagramNode: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '0.75rem',
    },
    nodeLabel: {
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-cyber)',
        letterSpacing: '0.1em',
    },
    pulseDisk: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        border: '2px solid var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-primary)',
    },
    arrowTable: {
        width: '60px',
        height: '60px',
        border: '1px solid var(--color-text-muted)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
        padding: '6px',
    },
    tableRow: {
        height: '10px',
        background: 'rgba(255,255,255,0.1)',
        width: '100%',
    },
    layersDiagram: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
        width: '100%',
        maxWidth: '300px',
    },
    layerCard: {
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.9rem',
    },
};

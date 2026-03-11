---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Mnemix"
  text: "The Memory Engine for AI Agents"
  tagline: A lightweight, inspectable, local-first memory engine providing your agents with built-in version history and time-travel.
  image:
    src: /logo.png
    alt: Mnemix Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/micahcourey/mnemix

features:
  - title: Scoped Memory
    details: Organize memories by project or context. Never cross-contaminate knowledge between different codebases.
    icon: 📁
  - title: Pinned Context
    details: Pin critical decisions or preferences to always surface first. Progressive disclosure keeps the context window clean.
    icon: 📌
  - title: Version History
    details: Every write creates an immutable version. Inspect and browse the full timeline of your agent's thought process.
    icon: 🕒
  - title: Time-Travel Restore
    details: Restore the store to any prior version or checkpoint as a new head state. Easily undo agent mistakes.
    icon: ⏪
  - title: Typed Memory
    details: Distinct types like observation, decision, preference, fact, and warning help the agent reason.
    icon: 📝
  - title: Local First
    details: Runs entirely on your filesystem using Arrow-native embedded storage. Zero cloud dependencies.
    icon: 🛡️
---

<div style="max-width: 900px; margin: 4rem auto; text-align: center;">

### 1-Minute Integration

The python SDK lets your agent read and write persistent memory seamlessly. Look how simple it is:

```python
from mnemix import Mnemix, RememberRequest

client = Mnemix(store=".mnemix")
client.init()

# Store an observation from the session
client.remember(RememberRequest(
    id="mem-001",
    scope="my-project",
    kind="decision",
    title="Use VitePress for Documentation",
    summary="It provides a fast, modern static site with a beautiful default theme.",
    importance=80
))

# Retrieve context for the next session
context = client.recall()
for entry in context.pinned_context:
    print(f"[pinned] {entry.memory.title}")
```

</div>

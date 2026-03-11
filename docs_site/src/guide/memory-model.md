# Memory Model

Each Mnemix memory record has the following fields to ensure structured retrieval and agent contextualization:

| Field | Purpose |
|-------|---------|
| `id` | Stable identifier for this memory |
| `scope` | Project or context namespace |
| `kind` | One of `observation`, `decision`, `preference`, `summary`, `fact`, `procedure`, `warning` |
| `title` | Short human-readable label |
| `summary` | Distilled, compact version of the memory |
| `detail` | Full detail — the complete context |
| `importance` | 0–100 score, controls recall ranking |
| `confidence` | 0–100 score, how certain this memory is |
| `tags` | Free-form labels for filtering and search |
| `entities` | Named entities mentioned in this memory |
| `pin_reason` | If set, this memory is pinned and surfaces first in recall |

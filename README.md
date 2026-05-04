# pyrefly

A Trunk plugin for [Pyrefly](https://pyrefly.org/), a fast Python type checker and language server from Meta, built in Rust.

## Installation

Enable the linter in your `.trunk/trunk.yaml`:

```yaml
lint:
  enabled:
    - pyrefly
```

Or use the CLI:

```bash
trunk check enable pyrefly
```

## About

Pyrefly is a high-performance Python type checker that:

- Type checks over 1.85 million lines of code per second
- Infers types in most locations (variables, return types)
- Uses flow types to refine static types through control flow analysis
- Supports incremental checking with parallelism

## Configuration

### Basic Usage

The plugin works out-of-the-box with sensible defaults. It will type check all Python files:

```bash
trunk check pyrefly
```

### Pyrefly Configuration

Pyrefly reads configuration from `pyrefly.toml` or `[tool.pyrefly]` in `pyproject.toml`:

```toml
# pyrefly.toml
project-includes = ["src/**/*.py*"]

[errors]
# disable specific error kinds
bad-assignment = false
```

See the [Pyrefly configuration docs](https://pyrefly.org/en/docs/configuration) for all options.

### Custom Command Options

To customize the linter behavior, override the definition in your `.trunk/trunk.yaml`:

```yaml
lint:
  definitions:
    - name: pyrefly
      commands:
        - name: lint
          run: pyrefly check --summary=none ${target}
```

## Ignoring Issues

### Inline Suppression

```python
result: str = greet(42)  # pyrefly: ignore[bad-argument-type]
```

### Next Line

```python
# pyrefly: ignore[bad-argument-type]
result: str = greet(42)
```

### Whole File

```python
# pyrefly: ignore-errors

def untyped_code():
    return "no errors reported"
```

### Via `type: ignore`

Pyrefly respects the standard `type: ignore` comment:

```python
result: str = greet(42)  # type: ignore
```

### Via Trunk

```yaml
lint:
  ignore:
    - linters: [pyrefly]
      paths:
        - path/to/file.py
```

## What It Catches

### Type Mismatches

```python
def greet(name: str) -> str:
    return "Hello, " + name

# ERROR: Argument `Literal[42]` is not assignable to parameter `name`
# with type `str` in function `greet` [bad-argument-type]
greet(42)
```

### Missing Attributes

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    return {1: "Alice"}.get(user_id)

# ERROR: Object of class `NoneType` has no attribute `upper` [missing-attribute]
find_user(1).upper()
```

### Bad Return Types

```python
def add(x: int, y: int) -> str:
    # ERROR: Returned type `int` is not assignable to declared return type `str` [bad-return]
    return x + y
```

## Testing

To test the plugin locally:

```bash
# Run the type checker on a single file
trunk check pyrefly path/to/file.py --verbose

# Force re-check (bypass cache)
trunk check pyrefly --force

# Run pyrefly directly for comparison
pyrefly check path/to/file.py
```

## Compatibility

- **Python versions**: 3.9+
- **Trunk CLI**: 1.7.0+
- **Pyrefly**: 0.60.0+

## Contributing

Issues and contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT — See the [upstream Pyrefly project](https://github.com/facebook/pyrefly) for details.

# Contributing to pyrefly Trunk Plugin

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/trunk-pyrefly.git
   cd trunk-pyrefly
   ```

2. **Install dependencies:**
   ```bash
   curl https://get.trunk.io -fsSL | bash
   trunk check
   ```

3. **Install pyrefly:**
   ```bash
   pip install pyrefly
   ```

## Testing

```bash
# Run all tests
trunk check

# Run only this plugin
trunk check pyrefly

# Verbose output
trunk check --verbose
```

### Manual Testing

```bash
cat > test_file.py << 'EOF'
def greet(name: str) -> str:
    return "Hello, " + name

result: str = greet(42)
EOF

pyrefly check test_file.py
echo $?  # 1 = type errors found, 0 = clean
```

## Making Changes

1. Update `plugin.yaml` with your changes
2. Run `trunk check` to validate
3. Test with `trunk check pyrefly --force`

### Test Data

Add new test cases to `test_data/`:

1. Create `test_name.in.py` with Python code containing type errors
2. Update `pyrefly.test.ts` to reference the new test

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Test thoroughly: `trunk check`
4. Commit: `git commit -m "feat: description"`
5. Push and open a pull request

## Submitting to Official Trunk Plugins

Submit to [trunk-io/plugins](https://github.com/trunk-io/plugins):

1. Fork https://github.com/trunk-io/plugins
2. Copy plugin files into `linters/pyrefly/`
3. Follow their [contribution guidelines](https://github.com/trunk-io/plugins/blob/main/CONTRIBUTING.md)
4. Open a PR

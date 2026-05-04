def greet(name: str) -> str:
    return "Hello, " + name


# Type error: passing int where str is expected
result: str = greet(42)

# Type error: incompatible return type
def add(x: int, y: int) -> str:
    return x + y

# Type error: missing attribute
value: int = "not_a_number".split()

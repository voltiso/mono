### 🚀 C++ CONVENTIONS: QUICK GUIDE 🚀

> 🎯 **GOAL**: Consistent, readable C++ code.

---

### 📝 NAMING 📝

- **TYPES**: `PascalCase`
- **COMPILE-TIME CONSTANTS**: `SCREAMING_SNAKE_CASE`
- **RUNTIME VALUES**: `camelCase`
- **PREFER SHORT NAMES**: `hello` (vs. `hello-world`), `Item` (vs. `ItemType`)

---

### 📁 HEADER FILES 📁

- **PUBLIC**: 🚫 **NO `.h` EXTENSION** (e.g., `module` not `module.h`)
- **INTERNAL**: ✅ Use `.hpp` extension, often in nested `_` folders.
- **LIBRARIES**: 💡 Often **HEADER-ONLY**.
- **INCLUDE GUARDS**: ✅ Use `#pragma once` (vs. traditional include guards).

---

### ➕ INCLUDES ➕

- **SORTING**: Specific to general (standard headers last).
- **EXTERNAL**: Use angle brackets (`<...>`).
- **LOCAL**: Use double quotes (`"..."`) for paths absolute to the `include`
  directory.

---

### 🗺️ NAMESPACE & DIR ALIGNMENT 🗺️

- **DIR STRUCTURE**: 🔗 Follows **NAMESPACE NESTING**.
- **INTERNAL FILES**:
  - `_` folder (`.hpp` files) ↔️ `_` namespace.
  - **ONE-TO-ONE** relationship.

---

### 🏛️ CLASS STRUCTURE 🏛️

- **PRIVATE MEMBERS**: Prefix with underscore (`_`).
- **DATA MEMBERS**: Declare all private data members at the beginning of the class definition.
